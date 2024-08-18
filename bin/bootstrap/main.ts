import { FileLoader } from '../loader';
import { TestRunner } from '../runner';
import { spinner, spinnerWrapper } from '../spinner';
import { Cli } from '../cli';
import { options } from '@stlib/utils';

async function main() {
  try {
    await Cli.handleOptions(options);
    await spinnerWrapper(FileLoader.loadTestFiles, [], 'Loading test files');
    TestRunner.run();
  } catch (e) {
    spinner.error();
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
main();
