import { glob } from 'glob';
import path from 'node:path';

export class FileLoader {
  public static async loadTestFiles() {
    const files = await glob('**/*.{spec,test}.ts', {
      ignore: 'node_modules/**',
    });

    await Promise.all(
      files.map(async (file) => {
        await require(path.resolve(file));
      }),
    );
  }
}
