import { createSpinner } from 'nanospinner';

export const spinner = createSpinner('Loading test files');

export const spinnerWrapper = async (callback: Promise<any> | any) => {
  try {
    spinner.start();
    await callback();
    spinner.success();
  } catch (e) {
    spinner.error();
    console.error(e);
  }
}
