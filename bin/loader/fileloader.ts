import path from 'node:path';
import glob from 'fast-glob';
import { Config } from '../config';
import { LoadFileException } from '../../lib/exceptions';
import { ConfigType } from '../../lib/types';

export class FileLoader {
  private static readonly projectPath = path.resolve('../../../');

  public static async loadTestFiles(changedFiles: string[] = []) {
    const testFiles =
      changedFiles.length > 0
        ? changedFiles
        : await FileLoader.getAllTestFiles();

    if (!testFiles.length) {
      throw new LoadFileException('  ⚠︎ No test files found.'.brightRed);
    }

    for (const file of testFiles) {
      FileLoader.deleteModuleCache(file);
      await import(file);
    }
  }

  private static async getAllTestFiles() {
    const config = await Config.getConfig() as ConfigType;

    const files = await glob(config?.pattern || '**/*.{spec,test}.ts', {
      ignore: config?.ignore || ['node_modules/**'],
      cwd: this.projectPath,
    });

    return files.map((file) => path.join(this.projectPath, file));
  }

  private static deleteModuleCache(filePath: string) {
    delete require.cache[require.resolve(filePath)];
  }
}
