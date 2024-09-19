import { TestRegistry } from '../testRegistry';
import {
  IAfter_Before,
  IDataSet,
  IDataTable,
  IDataTableArray,
  ITestCase,
} from '../../lib/interfaces';
import colors from '@colors/colors';
import exit from 'exit';
import { LifecycleType } from '../../lib/types';
import { Config } from '../config';
import { MockRegistry } from '../../lib';
import { isTable } from '../../utils';
import { TimeoutException } from '../../lib/exceptions';
import { options } from '../cli';
import { TestRunnerLogger } from '../logger';
import {
  HtmlReporter,
  ReportBuilder,
  ReportsRegistry,
} from '@stlib/testing-reporter';

export class TestRunner {
  private static isAllPassed: boolean = true;
  private static log: TestRunnerLogger = new TestRunnerLogger();

  public static async run() {
    try {
      const testSuites = TestRegistry.get();
      for (const { testName, target } of testSuites) {
        await this.runTestSuite(testName, target);
      }
    } finally {
      TestRegistry.clear();
      await HtmlReporter.generateReport();
      ReportsRegistry.clearRegistry();
      process.nextTick(() => {
        if (!options.watch) {
          this.isAllPassed ? exit(0) : exit(1);
        }
      });
    }
  }

  private static async runTestSuite(testName: string, target: any) {
    const testSuite = new target();
    console.log(colors.white.bold(`\n${testName}`));

    await this.runTestCycle(target, testSuite);
  }

  private static async runTestCycle(target: any, testSuite: any) {
    const testCases: ITestCase[] = target.testCases || [];
    const dataSetsArray: IDataSet[] = target.testCasesDataSets || [];
    const dataTableArray: IDataTableArray[] = target.testCasesDataTable || [];

    const beforeAll: IAfter_Before[] = target.beforeAll || [];
    const beforeEach: IAfter_Before[] = target.beforeEach || [];
    const afterAll: IAfter_Before[] = target.afterAll || [];
    const afterEach: IAfter_Before[] = target.afterEach || [];

    await this.runLifecycleMethods(testSuite, beforeAll, 'beforeAll');

    for (const { methodName, caseDescription, timeout } of testCases) {
      await this.runLifecycleMethods(testSuite, beforeEach, 'beforeEach');
      await this.runTestCase(
        testSuite,
        methodName,
        caseDescription,
        dataSetsArray,
        dataTableArray,
        timeout,
      );
      await this.runLifecycleMethods(testSuite, afterEach, 'afterEach');
      this.clearMocks('afterEach');
    }

    await this.runLifecycleMethods(testSuite, afterAll, 'afterAll');
    this.clearMocks('afterAll');
  }

  private static clearMocks(state: 'afterAll' | 'afterEach') {
    const isAutoClearMocksEnabled = Config.getConfig(
      'autoClearMocks',
    ) as boolean;
    if (isAutoClearMocksEnabled) {
      state === 'afterEach'
        ? MockRegistry.restoreAll()
        : MockRegistry.deleteAll();
    }
  }

  private static async runLifecycleMethods(
    testSuiteInstance: any,
    lifecycleMethods: IAfter_Before[],
    lifecyclePhase: LifecycleType,
  ) {
    try {
      for (const { methodName } of lifecycleMethods) {
        const result = testSuiteInstance[methodName]();
        if (result instanceof Promise) {
          await result;
        }
      }
    } catch (e) {
      this.log.error(`    ⚠︎ Error during ${lifecyclePhase}: ${e}`.brightRed);
    }
  }

  private static async runTestCase(
    testSuiteInstance: any,
    methodName: string,
    caseDescription: string,
    dataSetsArray: IDataSet[],
    dataTableArray: IDataTableArray[],
    timeout: number,
  ) {
    const reportBuilder = new ReportBuilder(
      testSuiteInstance.constructor.name,
      methodName,
    );
    const startTime = performance.now();

    try {
      const { dataTable, dataSets } = this.getCaseData(
        dataTableArray,
        dataSetsArray,
        methodName,
      );

      if (dataTable.length > 0) {
        await this.runTestCaseWithData(
          testSuiteInstance,
          methodName,
          dataTable,
          timeout,
        );
      } else {
        await this.runTestCaseWithData(
          testSuiteInstance,
          methodName,
          dataSets,
          timeout,
        );
      }

      const endTime = performance.now();
      reportBuilder.status('PASSED').duration(endTime - startTime);

      this.log.logTestResult(caseDescription || methodName, 'PASSED', 'grey');
    } catch (e: unknown) {
      const endTime = performance.now();
      reportBuilder
        .status('FAILED')
        .duration(endTime - startTime)
        .thrown(e instanceof Error ? e.message : `Unknown error: ${e}`);

      this.isAllPassed = false;
      this.log.handleError(e, methodName, caseDescription, testSuiteInstance);
    } finally {
      const testReport = reportBuilder.getReport().read();
      ReportsRegistry.addReport(testReport);
    }
  }

  private static async runTestCaseWithData(
    testSuiteInstance: any,
    methodName: string,
    dataArray: IDataSet[][] | IDataTable[],
    timeout: number,
  ) {
    if (dataArray.length <= 0) {
      return await this.getTestResult(
        testSuiteInstance,
        methodName,
        [],
        timeout,
      );
    }

    for (const data of dataArray) {
      await this.getTestResult(testSuiteInstance, methodName, data, timeout);
    }
  }

  private static async getTestResult(
    testSuiteInstance: any,
    methodName: string,
    data: IDataSet[] | IDataTable,
    timeout: number = 5000,
  ) {
    const testPromise = new Promise<void>((resolve, reject) => {
      const result = isTable(data)
        ? testSuiteInstance[methodName](...data.inputs, data.expected)
        : testSuiteInstance[methodName](...data);

      if (result instanceof Promise) {
        result.then(resolve).catch(reject);
      } else {
        resolve();
      }
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        reject,
        timeout,
        new TimeoutException(`Test timed out in ${timeout}ms`),
      );
    });

    await Promise.race([testPromise, timeoutPromise]);
  }

  private static getCaseData(
    dataTableArray: IDataTableArray[],
    dataSetsArray: IDataSet[],
    methodName: string,
  ) {
    const dataTable =
      dataTableArray.find(
        (dataTableObject) => dataTableObject.methodName === methodName,
      )?.dataTable || [];
    const dataSets =
      dataSetsArray.find(
        (dataSetObject) => dataSetObject.methodName === methodName,
      )?.dataSets || [];

    return { dataTable, dataSets };
  }
}
