import path from 'node:path';
import glob from 'fast-glob';

export class FileLoader {
  public static async loadTestFiles() {
    // const projectPath = path.resolve('../../../'); // go out of node_modules

    const files = await glob('**/*.{spec,test}.ts', {
      ignore: ['node_modules/**'],
      // cwd: projectPath,
    });

    await Promise.all(
      files.map(async (file) => {
        await import(path./* join(projectPath, */resolve(file));
      }),
    );
  }
}
