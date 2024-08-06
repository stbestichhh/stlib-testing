import { FileLoader } from '../loader';
import { TestRunner } from '../runner';

async function main() {
  try {
    await FileLoader.loadTestFiles();
    TestRunner.run();
  } catch (e) {
    console.error(e);
  }
}
main();
