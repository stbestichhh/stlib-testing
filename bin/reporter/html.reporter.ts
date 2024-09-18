import { TestReporter } from './reporter';
import fs from 'fs';
import path from 'node:path';
import { isExists } from '../../utils';
import { LoggerService } from '../logger';
import { ITestResult } from '../../lib/interfaces';

export class HtmlReporter {
  private static readonly projectPath = path.resolve('../../../');
  private static readonly log: LoggerService = new LoggerService();

  public static async generateReport() {
    const results = TestReporter.getResults();

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Report</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #333; }
          .test-suite { margin-bottom: 20px; }
          .test-case { margin-left: 20px; }
          .passed { color: green; }
          .failed { color: red; }
          .duration { font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Test Report</h1>
        ${this.renderResults(results)}
      </body>
      </html>
    `;

    const reportPath = path.join(
      this.projectPath,
      '.stest',
      'reports',
      `${new Date().toISOString()}.html`,
    );
    if (!(await isExists(path.dirname(reportPath)))) {
      await fs.promises.mkdir(path.dirname(reportPath), { recursive: true });
    }
    await fs.promises.writeFile(reportPath, html, 'utf-8').then(() => {
      this.log.info(`HTML report has been generated at ${reportPath}`);
    });
  }

  private static renderResults(results: ITestResult[]): string {
    const groupedResults = this.groupResultsBySuite(results);
    return groupedResults
      .map(
        ([suiteName, cases]) => `
        <div class="test-suite">
          <h2>Test Suite: ${suiteName}</h2>
          ${cases.map(this.renderTestCase).join('')}
        </div>
      `,
      )
      .join('');
  }

  private static renderTestCase(testCase: ITestResult): string {
    const statusClass = testCase.status === 'PASSED' ? 'passed' : 'failed';
    const error = testCase.error ? `<p>Error: ${testCase.error}</p>` : '';

    return `
      <div class="test-case">
        <p class="${statusClass}">${testCase.status}: ${testCase.caseName}</p>
        ${error}
        <p class="duration">Duration: ${testCase.duration.toFixed(2)} ms</p>
      </div>
    `;
  }

  private static groupResultsBySuite(
    results: ITestResult[],
  ): [string, ITestResult[]][] {
    return Object.entries(
      results.reduce(
        (acc, result) => {
          (acc[result.suiteName] = acc[result.suiteName] || []).push(result);
          return acc;
        },
        {} as { [suiteName: string]: ITestResult[] },
      ),
    );
  }
}
