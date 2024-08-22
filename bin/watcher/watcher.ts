import chokidar from 'chokidar';
import path from 'node:path';
import { TestRunner } from '../runner';
import { FileLoader } from '../loader';
import { spinner, spinnerWrapper } from '../spinner';

type ActionSymbolType = {
  add: string,
  unlink: string,
  change: string,
}

const actionSymbol: ActionSymbolType = {
  add: '+',
  unlink: '-',
  change: '↻',
}

export class Watcher {
  private watcher: chokidar.FSWatcher;
  private changedFiles: Set<string> = new Set<string>();
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
    this.watcher.once('change', (filePath) => this.onFileChange(filePath, 'change'));
    this.watcher.once('add', (filePath) => this.onFileChange(filePath, 'add'));
    this.watcher.once('unlink', (filePath) => this.onFileChange(filePath, 'unlink'));

    await this.runTests();
  }

  private async onFileChange(filepath: string, action: keyof ActionSymbolType) {
    console.log(`\n${actionSymbol[action]} ${filepath}`);
    this.changedFiles.add(path.join(this.projectPath, filepath));

    if (this.changedFiles.size === 0) {
      return;
    }

    await this.runTests();
  }

  private async runTests() {
    try {
      await spinnerWrapper(
        FileLoader.loadTestFiles,
        [[...this.changedFiles]],
        'Loading test files',
      );
      this.changedFiles.clear();
      TestRunner.run();
    } catch (e) {
      spinner.error();
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }
}
