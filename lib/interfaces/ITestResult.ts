export interface ITestResult {
  suiteName: string;
  caseName: string;
  status: 'PASSED' | 'FAILED';
  duration: number;
  error?: string
}
