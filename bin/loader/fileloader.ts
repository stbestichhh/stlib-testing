import path from 'node:path';
import glob from 'fast-glob';

export class FileLoader {
  public static async loadTestFiles() {
    console.time('a');
    const files = await glob('**/*.{spec,test}.ts', {
      ignore: ['node_modules/**'],
    });
    console.timeEnd('a');

    await Promise.all(
      files.map(async (file) => {
        await require(path.resolve(file));
      }),
    );
  }
}
