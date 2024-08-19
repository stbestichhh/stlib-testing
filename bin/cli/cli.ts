import { Config, ConfigType, initializeConfig } from '../config';
import exit from 'exit';
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
    try {
      await this.executeOptionMethods();
    } catch (e) {
      console.error(e);
      exit(1);
    }
  }

  public static getOptions(key?: keyof StestOptions) {
    return key ? this.options[key] : this.options;
  }

  private static async executeOptionMethods() {
    const { init, watch } = this.options;

    if (init) {
      await this.initializeConfig();
    } else if (watch) {
      await this.startWatcher();
    } else {
      await this.runTests();
    }
  }

  private static async initializeConfig() {
    await initializeConfig(this.options.init!);
    exit(0);
  }

  private static async startWatcher() {
    const projectPath = path.resolve('../../../'); //* prod
    // const projectPath = path.resolve(); //* dev

    const config: ConfigType | undefined =
      await Config.handleConfiguration(projectPath);

    const watcher = new Watcher([config?.pattern || '**/*.{spec,test}.ts'], {
      ignored: config?.ignore,
      persistent: true,
    });
    await watcher.start();
  }

  private static async runTests() {
    await spinnerWrapper(FileLoader.loadTestFiles, [], 'Loading test files');
    TestRunner.run();
  }
}
