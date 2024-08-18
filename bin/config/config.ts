import path from 'node:path';
import { isExists } from '@stlib/utils';
import fs from 'fs';
import YAML from 'yaml';
import { ConfigException } from '../../lib/exceptions';
import { Cli } from '../cli';

export type ConfigType = {
  pattern?: string;
  ignore?: string[];
};

export class Config {
  private static configPath?: string;
  private static useYml = false;
  private static isScriptFile = false;
  private static projectPath: string;

  public static async handleConfiguration(
    projectPath: string,
  ): Promise<ConfigType | undefined> {
    this.projectPath = projectPath;

    await this.setConfigPath();
    return this.configPath ? this.parseConfig() : undefined;
  }

  private static async setConfigPath(): Promise<void> {
    const configFileNames = [
      'stest.config.json',
      'stest.config.yml',
      'stest.config.js',
      'stest.config.ts',
    ];

    const configOption = Cli.getOptions('config');

    if (configOption && typeof configOption === 'string') {
      await this.setConfigPathIterator([configOption]);
    } else {
      await this.setConfigPathIterator(configFileNames);
    }
  }

  private static async setConfigPathIterator(configFileNames: string[]) {
    for (const fileName of configFileNames) {
      const configPath = path.join(this.projectPath, fileName);
      if (await isExists(configPath)) {
        this.configPath = configPath;
        this.useYml = configPath.endsWith('.yml');
        this.isScriptFile =
          configPath.endsWith('.js') || configPath.endsWith('.ts');
        break;
      }
    }
  }

  private static async parseConfig(): Promise<ConfigType | undefined> {
    if (this.isScriptFile) {
      return this.importConfigFromScript(this.configPath!);
    } else {
      const fileContent = await this.readConfigFile();
      return fileContent ? this.parseFileContent(fileContent) : undefined;
    }
  }

  private static async readConfigFile(): Promise<string | Buffer> {
    return fs.promises.readFile(this.configPath!);
  }

  private static parseFileContent(content: string | Buffer): ConfigType {
    const contentStr = content.toString();
    return this.useYml ? YAML.parse(contentStr) : JSON.parse(contentStr);
  }

  private static async importConfigFromScript(
    filePath: string,
  ): Promise<ConfigType | undefined> {
    try {
      const importedConfig = await import(filePath);
      return importedConfig.default || importedConfig;
    } catch (error) {
      console.error(
        new ConfigException(`Failed to load configuration from ${filePath}`),
      );
      return undefined;
    }
  }
}
