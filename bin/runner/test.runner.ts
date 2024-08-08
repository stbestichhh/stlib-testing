import { TestRegistry } from '../testRegistry';
import { ITestCase, ITestSuite } from '../../lib/interfaces';
import { findWhereErrorHasBeenThrown } from '../errorInfo';
import colors from '@colors/colors';

export class TestRunner {
  public static run() {
    console.log(colors.gray('ⓘ  Running test...'));

    TestRegistry.get().forEach(({ testName, target }: ITestSuite) => {
      const testSuite = new target();
      console.log(`\nⓘ  Test Suite: ${testName}`);

      const testCases: ITestCase[] = target.testCases || [];
      testCases.forEach(({ methodName, caseDescription }: ITestCase) => {
        try {
          testSuite[methodName]();
          console.log(`${`✓ ${caseDescription || methodName}`.brightGreen} - ${'PASSED'.bgGreen}`);
        } catch (e: unknown) {
          this.handleError(e, methodName, caseDescription, testSuite);
        }
      });
    });
  }

  private static handleError(e: unknown, methodName: string, caseDescription: string, testSuite: string) {
    console.error(`${`✗ ${caseDescription || methodName}`.brightRed} - ${'FAILED'.bgBrightRed}`);
    if (e instanceof Error) {
      const testClassName = testSuite.constructor.name;
      const errorInfo = findWhereErrorHasBeenThrown(e, testClassName);
      console.error(`  ⚠︎ ${errorInfo || e}`.red);
    }
  }
}
