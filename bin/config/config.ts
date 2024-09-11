import path from 'node:path';
import fs from 'fs';
import YAML from 'yaml';
import { ConfigException } from '../../lib/exceptions';
import { ConfigType } from '../../lib/types';
import { options } from '../cli';
import { isExists } from '../../utils';

export class Config {
  private static configPath?: string;
  private static useYml = false;
  private static isScriptFile = false;
  private static configuration: ConfigType | undefined = {};
  private static readonly projectPath = path.resolve('../../../');

  public static async handleConfiguration(): Promise<ConfigType | undefined> {
    await this.setConfigPath();
    return (this.configuration = this.configPath
      ? await this.parseConfig()
      : undefined);
  }

  public static getConfig(key?: keyof ConfigType) {
    return key && this.configuration
      ? this.configuration[key]
      : this.configuration;
  }

  private static async setConfigPath(): Promise<void> {
    const configFileNames = [
      'stest.config.json',
      'stest.config.yml',
      'stest.config.js',
      'stest.config.ts',
    ];

    if (options?.config) {
      await this.setConfigPathIterator([options.config]);
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
