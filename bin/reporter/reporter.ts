import { ITestResult } from '../../lib/interfaces';

export class TestReporter {
  private static testResults: ITestResult[] = [];

  public static addResult(result: ITestResult) {
    this.testResults.push(result);
  }

  public static getResults() {
    return this.testResults;
  }

  public static clearResults() {
    this.testResults = [];
  }
}
