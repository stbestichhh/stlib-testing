import { TestRegistry } from '../testRegistry';
import { IAfter_Before, ITestCase, ITestSuite } from '../../lib/interfaces';
import { findWhereErrorHasBeenThrown } from '../errorInfo';
import colors from '@colors/colors';
import exit from 'exit';
import { LifecycleType } from '../../lib/types';

export class TestRunner {
  private static isAllPassed: boolean = true;

  public static run() {
    TestRegistry.get().forEach(({ testName, target }: ITestSuite) => {
      this.runTestSuite(testName, target);
    });

    if (!this.isAllPassed) {
      exit(1);
    }
  }

  private static runTestSuite(testName: string, target: any) {
    const testSuite = new target();
    console.log(colors.white.bold(`\nTest Suite: ${testName}`));

    const testCases: ITestCase[] = target.testCases || [];
    const beforeAll: IAfter_Before[] = target.beforeAll || [];
    const beforeEach: IAfter_Before[] = target.beforeEach || [];
    const afterAll: IAfter_Before[] = target.afterAll || [];
    const afterEach: IAfter_Before[] = target.afterEach || [];

    this.runLifecycleMethods(testSuite, beforeAll, 'beforeAll');
    testCases.forEach(({ methodName, caseDescription }: ITestCase) => {
      this.runLifecycleMethods(testSuite, beforeEach, 'beforeEach');
      this.runTestCase(testSuite, methodName, caseDescription);
      this.runLifecycleMethods(testSuite, afterEach, 'afterEach');
    });
    this.runLifecycleMethods(testSuite, afterAll, 'afterAll');
  }

  private static runLifecycleMethods(
    testSuiteInstance: any,
    lifecycleMethods: IAfter_Before[],
    lifecuclePahse: LifecycleType,
  ) {
    try {
      lifecycleMethods.forEach(({ methodName }: IAfter_Before) => {
        testSuiteInstance[methodName]();
      });
    } catch (e) {
      console.error(`    ⚠︎ Error during ${lifecuclePahse}: ${e}`.brightRed);
    }
  }

  private static runTestCase(
    testSuiteInstance: any,
    methodName: string,
    caseDescription: string,
  ) {
    try {
      testSuiteInstance[methodName]();
      this.logTestResult(caseDescription || methodName, 'PASSED', 'grey');
    } catch (e: unknown) {
      this.isAllPassed = false;
      this.handleError(e, methodName, caseDescription, testSuiteInstance);
    }
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
