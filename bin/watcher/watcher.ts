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
  private isWatching: boolean = true;
  private showHelp: boolean = true;
  private readonly projectPath = path.resolve('../../../');

  constructor(
    private patterns: string[],
    private options: chokidar.WatchOptions = {},
  ) {
    this.watcher = this.createWatcher();

    this.handleKeyPressed();
  }

  private createWatcher() {
    return chokidar.watch(this.patterns, {
      cwd: this.projectPath,
      ...this.options,
    });
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
    this.changedFiles.clear();
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
      await TestRunner.run();

      this.showBindingsHelp();
    } catch (e) {
      spinner.error();
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  private showBindingsHelp() {
    if (this.showHelp) {
      console.log(
        '\nR - rerun previous tests\nA - run all tests\nP - pause file watching\nT - toggle test caching\nC - clear console\nH - show/hide key bindings\nQ - Exit\n'
          .bold,
      );
    }
  }

  private async handleKeyPressed() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.on('keypress', async (chunk, key) => {
      if (key) {
        await this.handleKeyAction(key.name);
      }
    });
  }

  private async handleKeyAction(key: string) {
    switch (key) {
      case 'h':
        this.toggleHelp();
        break;
      case 't':
        this.toggleCache();
        break;
      case 'p':
        await this.togglePause();
        break;
      case 'a':
        await this.rerunAllTests();
        break;
      case 'r':
        await this.rerunLastTests();
        break;
      case 'c':
        this.clearConsole();
        break;
      case 'q':
        exit(0);
        break;
    }
  }

  private async rerunLastTests() {
    this.clearConsole();
    await this.runTests();
  }

  private async rerunAllTests() {
    this.clearConsole();
    this.changedFiles.clear();
    await this.runTests();
  }

  private async togglePause() {
    if (this.isWatching) {
      await this.watcher.close();
      this.showToggleInfo(!this.isWatching, 'File watch');
    } else {
      this.clearConsole();
      this.watcher = this.createWatcher();
      await this.start();
    }
    this.isWatching = !this.isWatching;
  }

  private toggleCache() {
    this.isCachingEnabled = !this.isCachingEnabled;
    this.showToggleInfo(this.isCachingEnabled, 'Cache');
  }

  private toggleHelp() {
    this.showHelp = !this.showHelp;
    this.showToggleInfo(this.showHelp, 'Help');
  }

  private clearConsole() {
    console.clear();
    process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
    console.log('\u001b[0;0H'); // Move cursor to top-left corner
  }

  private showToggleInfo(switchValue: boolean, switchName: string) {
    switchValue
      ? console.log(`${switchName} enabled`.yellow.bold)
      : console.log(`${switchName} disabled`.yellow.bold);
  }
}
