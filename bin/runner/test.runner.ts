import { TestRegistry } from '../testRegistry';
import {
  IAfter_Before,
  IDataSet,
  IDataTable,
  IDataTableArray,
  ITestCase,
} from '../../lib/interfaces';
import { findWhereErrorHasBeenThrown } from '../errorInfo';
import colors from '@colors/colors';
import exit from 'exit';
import { LifecycleType } from '../../lib/types';
import { Cli } from '../cli';
import { Config } from '../config';
import { MockRegistry } from '../../lib';
import { isTable } from '../../utils';
import { TimeoutException } from '../../lib/exceptions';

export class TestRunner {
  private static isAllPassed: boolean = true;

  public static async run() {
    try {
      const testSuites = TestRegistry.get();
      for (const { testName, target } of testSuites) {
        await this.runTestSuite(testName, target);
      }
    } finally {
      if (!this.isAllPassed && !Cli.getOptions('watch')) {
        exit(1);
      }
      TestRegistry.clear();
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

    for (const { methodName, caseDescription } of testCases) {
      await this.runLifecycleMethods(testSuite, beforeEach, 'beforeEach');
      await this.runTestCase(
        testSuite,
        methodName,
        caseDescription,
        dataSetsArray,
        dataTableArray,
      );
      await this.runLifecycleMethods(testSuite, afterEach, 'afterEach');
      this.clearMocks('afterEach');
    }

    await this.runLifecycleMethods(testSuite, afterAll, 'afterAll');
    this.clearMocks('afterAll');
  }

  private static clearMocks(state: 'afterAll' | 'afterEach') {
    const isAutoClearMocksEnabled = Config.getConfig('autoClearMocks');
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
      console.error(`    ⚠︎ Error during ${lifecyclePhase}: ${e}`.brightRed);
    }
  }

  private static async runTestCase(
    testSuiteInstance: any,
    methodName: string,
    caseDescription: string,
    dataSetsArray: IDataSet[],
    dataTableArray: IDataTableArray[],
  ) {
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
        );
      } else {
        await this.runTestCaseWithData(testSuiteInstance, methodName, dataSets);
      }

      this.logTestResult(caseDescription || methodName, 'PASSED', 'grey');
    } catch (e: unknown) {
      this.isAllPassed = false;
      this.handleError(e, methodName, caseDescription, testSuiteInstance);
    }
  }

  private static async runTestCaseWithData(
    testSuiteInstance: any,
    methodName: string,
    dataArray: IDataSet[][] | IDataTable[],
  ) {
    if (dataArray.length <= 0) {
      return await this.getTestResult(testSuiteInstance, methodName, []);
    }

    for (const data of dataArray) {
      await this.getTestResult(testSuiteInstance, methodName, data);
    }
  }

  private static async getTestResult(
    testSuiteInstance: any,
    methodName: string,
    data: IDataSet[] | IDataTable,
  ) {
    const testPromise = new Promise<void>((resolve, reject) => {
      const result = isTable(data)
        ? testSuiteInstance[methodName](...data.inputs, data.expected)
        : testSuiteInstance[methodName](...data);

      if (result instanceof Promise) {
        result.then(resolve).catch(reject);
      } else {
        resolve()
      }
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(reject, 5000, new TimeoutException(`Test timed out in 5000ms`));
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

  private static logTestResult(
    description: string,
    result: 'PASSED' | 'FAILED',
    textColor: 'brightGreen' | 'brightRed' | 'grey',
  ) {
    const statusBadge = result === 'PASSED' ? '✓'.brightGreen : '✗'.brightRed;
    console.log(`  ${statusBadge} ${description[textColor]}`);
  }

  private static handleError(
    e: unknown,
    methodName: string,
    caseDescription: string,
    testSuite: string,
  ) {
    this.logTestResult(caseDescription || methodName, 'FAILED', 'grey');
    if (e instanceof Error) {
      const testClassName = testSuite.constructor.name;
      const errorInfo = findWhereErrorHasBeenThrown(e, testClassName);
      console.error(`    ⚠︎ ${errorInfo || e}`.brightRed);
    }
  }
}
