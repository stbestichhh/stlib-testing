import path from 'node:path';
import glob from 'fast-glob';
import { Config, ConfigType } from '../config';

//? Commented code is only for testing while developing
export class FileLoader {
  public static async loadTestFiles() {
    const projectPath = path.resolve('../../../'); //* prod
    // const projectPath = path.resolve(); //* dev

    const config: ConfigType | undefined =
      await Config.handleConfiguration(projectPath);

    const files = await glob(config?.pattern || '**/*.{spec,test}.ts', {
      ignore: config?.ignore || ['node_modules/**'],
      cwd: projectPath, //* prod
    });

    await Promise.all(
      files.map(async (file) => {
        await import(path.join(projectPath, file)); //* prod
        // await import(path.resolve(file)); //* dev
      }),
    );
  }
}
