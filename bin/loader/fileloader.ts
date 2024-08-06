import path from 'node:path';
import glob from 'fast-glob';

export class FileLoader {
  public static async loadTestFiles() {
    const files = await glob('**/*.{spec,test}.ts', {
      ignore: ['node_modules/**'],
    });

    await Promise.all(
      files.map(async (file) => {
        await import(path.resolve(file));
      }),
    );
  }
}
