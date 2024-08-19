import { spinner } from '../spinner';
import { Cli } from '../cli';
import { options } from '@stlib/utils';

async function main() {
  try {
    await Cli.handleOptions(options);
  } catch (e) {
    spinner.error();
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
main();
