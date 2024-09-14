import { Watcher } from './watcher';
import { Config } from '../config';
import { ConfigType } from '../../lib/types';

export const startWatcher = async () => {
  const config = await Config.getConfig() as ConfigType;

  const watcher = new Watcher([config?.pattern || '**/*.{spec,test}.ts'], {
    ignored: config?.ignore,
    persistent: true,
    ignoreInitial: true,
  });

  await watcher.start();
};
