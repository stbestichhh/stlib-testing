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

  public static async handleOptions(options: StestOptions) {
    this.options = options;
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
    const projectPath = path.resolve('../../../'); //* prod
    // const projectPath = path.resolve(); //* dev

    const config: ConfigType | undefined =
      await Config.handleConfiguration(projectPath);

    const watcher = new Watcher([config?.pattern || '**/*.{spec,test}.ts'], {
      ignored: config?.ignore,
      persistent: true,
      ignoreInitial: true,
    });
    await watcher.start();
  }

  private static async runTests() {
    await spinnerWrapper(FileLoader.loadTestFiles, [], 'Loading test files');
    TestRunner.run();
  }
}
