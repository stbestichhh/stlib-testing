import { spinner, spinnerWrapper } from '../spinner';
import { FileLoader } from '../loader';
import { TestRunner } from '../runner';

export const runTests = async () => {
  try {
    await spinnerWrapper(FileLoader.loadTestFiles, [], 'Loading test files');
    await TestRunner.run();
  } catch (e) {
    spinner.error();
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};
