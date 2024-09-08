import { OptionsType } from '@stlib/utils';

export interface StestOptions extends Partial<OptionsType> {
  config?: string;
  init?: boolean | string;
  watch?: boolean;
}
