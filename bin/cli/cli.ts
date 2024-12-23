import { program } from 'commander';
import { StestOptions } from '../../lib/interfaces';
import { Config, initializeConfig } from '../config';
import { startWatcher } from '../watcher';
import { runTests } from '../bootstrap/runTests';

const handleOptionsAndExecuteAction = async (options: StestOptions) => {
  if (options.init) {
    await initializeConfig(options.init);
  }

  await new Config(options).handleConfiguration();
  if (options.watch) {
    await startWatcher();
  } else {
    await runTests();
  }
};

program
  .name('stest')
  .description('Testing framework for TypeScript Node.js applications')
  .version('1.2.2');

program
  .option(
    '--init [extension]',
    'initialise configuration file [json | yml | ts | js]',
  )
  .option('-w, --watch', 'run tests in watch mode')
  .option('-c, --config <path>', 'define custom config file path')
  .allowUnknownOption()
  .action(async (options: StestOptions) => {
    await handleOptionsAndExecuteAction(options);
  });

program.parse(process.argv);
export const options: StestOptions = program.opts<StestOptions>();
