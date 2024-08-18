import fs from 'fs';
import path from 'node:path';
import { InitValue } from '../cli';
import { patterns } from './patterns';

export async function initializeConfig(initValue: InitValue) {
    const fileExtension = typeof initValue === 'string' ? initValue : 'json';
    const filePath = path.resolve('../../../', `stest.config.${fileExtension}`);
    await fs.promises.writeFile(
      filePath,
      patterns[fileExtension],
    );
    console.log(`Config initialized at ${filePath}`);
}
