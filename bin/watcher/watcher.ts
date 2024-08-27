import chokidar from 'chokidar';
import path from 'node:path';
import { TestRunner } from '../runner';
import { FileLoader } from '../loader';
import { spinner, spinnerWrapper } from '../spinner';
import { Config } from '../config';
import { actionSymbol, ActionSymbolType } from '../../lib/types';
import * as readline from 'readline';
import exit from 'exit';

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

    this.handleKeyPressed();
  }

  public async start() {
    const isCachingEnabledConf = Config.getConfig('cacheWatcher');
    this.isCachingEnabled =
      typeof isCachingEnabledConf === 'boolean' ? isCachingEnabledConf : true;

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
      await TestRunner.run();

      console.log('\nR - rerun tests\nQ - Exit\n'.bold);
    } catch (e) {
      spinner.error();
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  private async handleKeyPressed() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.on('keypress', async (chunk, key) => {
      if (key && key.name === 'r') {
        await this.runTests();
      }

      if (key && key.name === 'q') {
        exit(0);
      }
    });
  }

  private clearConsole() {
    console.clear();
    process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
    console.log('\u001b[0;0H'); // Move cursor to top-left corner
  }
}
