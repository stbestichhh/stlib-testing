import { OptionValues } from 'commander';

export interface StestOptions extends OptionValues {
  config?: string;
  init?: string;
  watch?: boolean;
}
