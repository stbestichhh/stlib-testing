import { createSpinner } from 'nanospinner';

export const spinner = createSpinner();

export const spinnerWrapper = async (
  callback: Promise<any> | any,
  args: any[],
  message?: string,
) => {
  spinner.start({ text: message });
  await callback(...args);
  spinner.success({ text: message });
};
