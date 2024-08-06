import { TestRegistry } from '../testRegistry';
import { ITestCase, ITestSuite } from '../../lib/interfaces';

export class TestRunner {
  public static run() {
    console.log('Running test...');

    TestRegistry.get().forEach(({ testName, target }: ITestSuite) => {
      const testSuite = new target();
      console.log(`\nTest Suite: ${testName}`);

      const testCases: ITestCase[] = target.testCases || [];
      testCases.forEach(({ methodName, caseDescription }: ITestCase) => {
        try {
          testSuite[methodName]();
          console.log(`✓ ${caseDescription}`);
        } catch (e) {
          console.error(`✗ ${caseDescription}`);
          console.error(`  ${e}`);
        }
      });
    });
  }
}
