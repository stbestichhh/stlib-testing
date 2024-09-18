import { Report } from './report';

export class ReportBuilder {
  private readonly report: Report;

  constructor(suiteName: string, caseName: string) {
    this.report = new Report(suiteName, caseName);
  }

  public getReport(): Report {
    return this.report;
  }

  public status(testStatus: 'PASSED' | 'FAILED') {
    this.report.setStatus(testStatus);
    return this;
  }

  public duration(time: number) {
    this.report.setDuration(time);
    return this;
  }

  public thrown(error: string) {
    this.report.setError(error);
    return this;
  }
}
