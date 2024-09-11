import { Watcher } from './watcher';
import { Config } from '../config';
import { ConfigType } from '../../lib/types';

export const startWatcher = async () => {
  const config: ConfigType | undefined = await Config.handleConfiguration();

  const watcher = new Watcher([config?.pattern || '**/*.{spec,test}.ts'], {
    ignored: config?.ignore,
    persistent: true,
    ignoreInitial: true,
  });

  await watcher.start();
};
