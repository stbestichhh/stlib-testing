import { OptionsType } from '@stlib/utils';
import { initializeConfig } from '../config';
import exit from 'exit';

export type InitValue = boolean | 'js' | 'ts' | 'json' | 'yml';

export interface StestOptions extends Partial<OptionsType> {
  config?: string;
  init?: InitValue;
}

export class Cli {
  private static options: StestOptions = {};

  public static async handleOptions(options: StestOptions) {
    try {
      this.options = options;
      if (options.init) {
        await initializeConfig(options.init);
      }

      exit(0);
    } catch (e) {
      console.error(e);
      exit(1);
    }
  }

  public static getOptions(key?: keyof StestOptions) {
    return key ? this.options[key] : this.options;
  }
}
