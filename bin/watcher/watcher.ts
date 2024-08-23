import chokidar from 'chokidar';
import path from 'node:path';
import { TestRunner } from '../runner';
import { FileLoader } from '../loader';
import { spinner, spinnerWrapper } from '../spinner';

type ActionSymbolType = {
  add: string;
  unlink: string;
  change: string;
};

const actionSymbol: ActionSymbolType = {
  add: '+',
  unlink: '-',
  change: '↻',
};

export class Watcher {
  private watcher: chokidar.FSWatcher;
  private changedFiles: Set<string> = new Set<string>();
  private isCachingEnabled: boolean = true;
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

  public async start(isCachingEnabled?: boolean) {
    this.isCachingEnabled =
      isCachingEnabled !== undefined ? isCachingEnabled : true;

    this.watcher.on('change', (filePath) =>
      this.onFileChange(filePath, 'change'),
    );
    this.watcher.on('add', (filePath) => this.onFileChange(filePath, 'add'));
    this.watcher.on('unlink', (filePath) =>
      this.onFileChange(filePath, 'unlink'),
    );

    await this.runTests();
  }

  private async onFileChange(filepath: string, action: keyof ActionSymbolType) {
    this.clearConsole();
    console.log(`${actionSymbol[action]} ${filepath}`);

    if (action !== 'unlink') {
      this.changedFiles.add(path.join(this.projectPath, filepath));
    }

    if (this.changedFiles.size === 0) {
      return;
    }

    await this.runTests();
  }

  private async runTests() {
    try {
      const changedFilesArray = this.isCachingEnabled
        ? [...this.changedFiles]
        : undefined;

      await spinnerWrapper(
        FileLoader.loadTestFiles,
        [changedFilesArray],
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

  private clearConsole() {
    console.clear();
    process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
    console.log('\u001b[0;0H'); // Move cursor to top-left corner
  }
}
