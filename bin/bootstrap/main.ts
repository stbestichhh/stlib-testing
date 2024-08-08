import { FileLoader } from '../loader';
import { TestRunner } from '../runner';
import { spinner } from '../spinner';

async function main() {
  try {
    spinner.start();
    await FileLoader.loadTestFiles();
    spinner.success();
    TestRunner.run();
  } catch (e) {
    console.error(e);
  }
}
main();
