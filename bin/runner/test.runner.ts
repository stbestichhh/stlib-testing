import { TestRegistry } from '../testRegistry';
import { ITestCase, ITestSuite } from '../../lib/interfaces';
import { findWhereErrorHasBeenThrown } from '../errorInfo';
import colors from '@colors/colors';

export class TestRunner {
  public static run() {
    console.log(colors.gray('ⓘ  Running test...'));

    TestRegistry.get().forEach(({ testName, target }: ITestSuite) => {
      this.runTestSuite(testName, target);
    });
  }

  private static runTestSuite(testName: string, target: any) {
    const testSuite = new target();
    console.log(`\nⓘ  Test Suite: ${testName}`);

    const testCases: ITestCase[] = target.testCases || [];
    testCases.forEach(({ methodName, caseDescription }: ITestCase) => {
      this.runTestCase(testSuite, methodName, caseDescription);
    });
  }

  private static runTestCase(
    testSuiteInstance: any,
    methodName: string,
    caseDescription: string,
  ) {
    try {
      testSuiteInstance[methodName]();
      this.logTestResult(
        caseDescription || methodName,
        'PASSED',
        'brightGreen',
        'bgGreen',
      );
    } catch (e: unknown) {
      this.handleError(e, methodName, caseDescription, testSuiteInstance);
    }
  }

  private static logTestResult(
    description: string,
    result: 'PASSED' | 'FAILED',
    textColor: 'brightGreen' | 'brightRed',
    bgColor: 'bgGreen' | 'bgBrightRed',
  ) {
    const statusBadge = result === 'PASSED' ? '✓'.brightGreen : '✗'.brightRed;
    console.log(
      `${statusBadge} ${description[textColor]} - ${result[bgColor]}`,
    );
  }

  private static handleError(
    e: unknown,
    methodName: string,
    caseDescription: string,
    testSuite: string,
  ) {
    this.logTestResult(
      caseDescription || methodName,
      'FAILED',
      'brightRed',
      'bgBrightRed',
    );
    if (e instanceof Error) {
      const testClassName = testSuite.constructor.name;
      const errorInfo = findWhereErrorHasBeenThrown(e, testClassName);
      console.error(`  ⚠︎ ${errorInfo || e}`.red);
    }
  }
}
