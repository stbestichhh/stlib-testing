import path from 'node:path';
import glob from 'fast-glob';
import { Config, ConfigType } from '../config';
import { LoadFileException } from '../../lib/exceptions';

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

    if (!files.length) {
      throw new LoadFileException('  ⚠︎ No test files found.'.brightRed);
    }

    await Promise.all(
      files.map(async (file) => {
        await import(path.join(projectPath, file)); //* prod
        // await import(path.resolve(file)); //* dev
      }),
    );
  }
}
