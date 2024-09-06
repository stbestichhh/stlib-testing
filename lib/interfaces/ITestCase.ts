export interface ITestCase {
  readonly methodName: string;
  readonly caseDescription: string;
  readonly timeout: number;
}
