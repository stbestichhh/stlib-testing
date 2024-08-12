import path from 'node:path';
import { isExists } from '@stlib/utils';
import fs from 'fs';

export type ConfigType = {
  pattern?: string;
  ignore?: string[];
};

export class Config {
  private static async readConfiguration(projectPath: string) {
    const configPath = path.join(projectPath, 'stest.config.json');

    if (await isExists(configPath)) {
      return await fs.promises.readFile(configPath);
    }
    return undefined;
  }

  public static async handleConfiguration(
    projectPath: string,
  ): Promise<ConfigType | undefined> {
    const unparsedConfig = await this.readConfiguration(projectPath);

    if (unparsedConfig) {
      const configuration: ConfigType = JSON.parse(unparsedConfig.toString());
      return { pattern: configuration.pattern, ignore: configuration.ignore };
    }
    return undefined;
  }
}
