import { LoggerService } from './logger.service';
import { findWhereErrorHasBeenThrown } from '../errorInfo';

export class TestRunnerLogger extends LoggerService {
  public logTestResult(
    description: string,
    result: 'PASSED' | 'FAILED',
    textColor: 'brightGreen' | 'brightRed' | 'grey',
  ) {
    const statusBadge = result === 'PASSED' ? '✓'.brightGreen : '✗'.brightRed;
    console.log(`  ${statusBadge} ${description[textColor]}`);
  }

  public handleError(
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
