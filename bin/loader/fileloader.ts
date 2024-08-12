import path from 'node:path';
import glob from 'fast-glob';
import { Config, ConfigType } from '../config';

//? Commented code is only for testing while developing
export class FileLoader {
  public static async loadTestFiles() {
    const projectPath = path.resolve('../../../'); // go out of node_modules
    // const projectPath = path.resolve();

    const config: ConfigType | undefined =
      await Config.handleConfiguration(projectPath);

    const files = await glob(config?.pattern || '**/*.{spec,test}.ts', {
      ignore: config?.ignore || ['node_modules/**'],
      cwd: projectPath,
    });

    await Promise.all(
      files.map(async (file) => {
        await import(path.join(projectPath, file));
        // await import(path.resolve(file));
      }),
    );
  }
}
