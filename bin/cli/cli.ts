import { Config, ConfigType, initializeConfig } from '../config';
import { Watcher } from '../watcher';
import path from 'node:path';
import { spinnerWrapper } from '../spinner';
import { FileLoader } from '../loader';
import { TestRunner } from '../runner';
import { OptionsType } from '@stlib/utils';

export type InitValue = boolean | 'js' | 'ts' | 'json' | 'yml';

export interface StestOptions extends Partial<OptionsType> {
  config?: string;
  init?: InitValue;
  watch?: boolean;
}

export class Cli {
  private static options: StestOptions = {};
  private static config: ConfigType | undefined = {};
  private static readonly projectPath = path.resolve('../../../'); //* prod
  // private static readonly projectPath = path.resolve(); //* dev

  public static async handleOptions(options: StestOptions) {
    this.options = options;
    this.config = await Config.handleConfiguration(this.projectPath);
    await this.executeOptionMethods();
  }

  public static getOptions(key?: keyof StestOptions) {
    return key ? this.options[key] : this.options;
  }

  private static async executeOptionMethods() {
    const { init, watch } = this.options;

    if (init) {
      await initializeConfig(this.options.init!);
    } else if (watch) {
      await this.startWatcher();
    } else {
      await this.runTests();
    }
  }

  private static async startWatcher() {
    const watcher = new Watcher(
      [this.config?.pattern || '**/*.{spec,test}.ts'],
      {
        ignored: this.config?.ignore,
        persistent: true,
        ignoreInitial: true,
      },
    );
    await watcher.start();
  }

  private static async runTests() {
    await spinnerWrapper(FileLoader.loadTestFiles, [], 'Loading test files');
    TestRunner.run();
  }
}
