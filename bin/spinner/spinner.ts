import { createSpinner } from 'nanospinner';

export const spinner = createSpinner('Loading test files');

export const spinnerWrapper = async (callback: Promise<any> | any) => {
    spinner.start();
    await callback();
    spinner.success();
};
