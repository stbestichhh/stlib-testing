import chokidar from 'chokidar';
import path from 'node:path';
import { TestRunner } from '../runner';
import { FileLoader } from '../loader';
import { spinner, spinnerWrapper } from '../spinner';

export class Watcher {
  private watcher: chokidar.FSWatcher;
  private readonly projectPath = path.resolve('../../../');

  constructor(
    private patterns: string[],
    private options: chokidar.WatchOptions = {},
  ) {
    this.watcher = chokidar.watch(patterns, {
      cwd: this.projectPath,
      ...options,
    });
  }

  public async start() {
    this.watcher.once('change', (filePath) => {
      console.log(`File changed: ${filePath}`);
      this.runTests();
    });

    this.watcher.once('add', (filepath) => {
      console.log(`New file added: ${filepath}`);
      this.runTests();
    });

    this.watcher.once('unlink', (filepath) => {
      console.log(`File removed: ${filepath}`);
      this.runTests();
    });

    await this.runTests();
  }

  private async runTests() {
    try {
      await spinnerWrapper(FileLoader.loadTestFiles, [], 'Loading test files');
      TestRunner.run();
    } catch (e) {
      spinner.error();
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }
}
