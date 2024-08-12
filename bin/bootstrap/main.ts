import { FileLoader } from '../loader';
import { TestRunner } from '../runner';
import { spinner, spinnerWrapper } from '../spinner';

async function main() {
  try {
    await spinnerWrapper(FileLoader.loadTestFiles);
    TestRunner.run();
  } catch (e) {
    spinner.error();
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
main();
