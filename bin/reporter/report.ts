import { ITestResult } from '../../lib/interfaces';

export class Report {
  private readonly suiteName: string;
  private readonly caseName: string;
  private duration: number = 0;
  private status: 'PASSED' | 'FAILED' = 'FAILED';
  private error: string | undefined;

  constructor(suiteName: string, caseName: string) {
    this.suiteName = suiteName;
    this.caseName = caseName;
  }

  public read(): ITestResult {
    return {
      suiteName: this.suiteName,
      caseName: this.caseName,
      status: this.status,
      duration: this.duration,
      error: this.error,
    };
  }

  public setStatus(status: 'PASSED' | 'FAILED') {
    this.status = status;
  }

  public setDuration(time: number) {
    this.duration = time;
  }

  public setError(error: string) {
    this.error = error;
  }
}
