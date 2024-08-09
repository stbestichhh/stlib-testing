import { FileLoader } from '../loader';
import { TestRunner } from '../runner';
import { spinnerWrapper } from '../spinner';

async function main() {
  try {
    await spinnerWrapper(FileLoader.loadTestFiles);
    TestRunner.run();
  } catch (e) {
    console.error(e);
  }
}
main();
