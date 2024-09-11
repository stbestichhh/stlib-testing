import fs from 'fs';
import path from 'node:path';
import { patterns } from './patterns';
import exit from 'exit';

export async function initializeConfig(initValue: boolean | string) {
  const supportedExtension = ['ts', 'js', 'json', 'yml'];
  const fileExtension =
    typeof initValue === 'string' && supportedExtension.includes(initValue)
      ? initValue
      : 'json';

  const fileName = `stest.config.${fileExtension}`;
  const filePath = path.resolve('../../../', fileName);

  try {
    await fs.promises.writeFile(filePath, patterns[fileExtension]);
    console.log(`Config initialized at ${filePath}`);
    exit(0);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Failed to initialize config: ${e.message}`);
      exit(1);
    }
  }
}
