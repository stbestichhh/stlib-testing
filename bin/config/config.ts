import path from 'node:path';
import { isExists } from '@stlib/utils';
import fs from 'fs';
import YAML from 'yaml';

export type ConfigType = {
  pattern?: string;
  ignore?: string[];
};

export class Config {
  private static configPath: string | undefined;
  private static useYml: boolean = false;

  public static async handleConfiguration(
    projectPath: string,
  ): Promise<ConfigType | undefined> {
    const unparsedConfig = await this.readConfiguration(projectPath);

    if (unparsedConfig) {
      return await this.parseConfig(unparsedConfig);
    }

    return undefined;
  }

  private static async readConfiguration(projectPath: string) {
    await this.defineConfigPath(projectPath);

    if (this.configPath) {
      return await fs.promises.readFile(this.configPath);
    }

    return undefined;
  }

  private static async parseConfig(unparsedConfig: string | Buffer) {
    if (unparsedConfig) {
      let configuration: ConfigType;
      if (this.useYml) {
        configuration = YAML.parse(unparsedConfig.toString());
      } else {
        configuration = JSON.parse(unparsedConfig.toString());
      }
      return { pattern: configuration.pattern, ignore: configuration.ignore };
    }
  }

  private static async defineConfigPath(projectPath: string): Promise<void> {
    const configPathJson = path.join(projectPath, 'stest.config.json');
    const configPathYml = path.join(projectPath, 'stest.config.yml');

    if (await isExists(configPathJson)) {
      this.configPath = configPathJson;
    } else if (await isExists(configPathYml)) {
      this.useYml = true;
      this.configPath = configPathYml;
    }
  }
}
