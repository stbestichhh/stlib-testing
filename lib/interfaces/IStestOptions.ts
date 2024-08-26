import { OptionsType } from '@stlib/utils';
import { InitValue } from '../../bin/cli';

export interface StestOptions extends Partial<OptionsType> {
  config?: string;
  init?: InitValue;
  watch?: boolean;
}
