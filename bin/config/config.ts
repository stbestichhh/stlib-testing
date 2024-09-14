import path from 'node:path';
import fs from 'fs';
import YAML from 'yaml';
import { ConfigException } from '../../lib/exceptions';
import { ConfigType } from '../../lib/types';
import { isExists } from '../../utils';
import { StestOptions } from '../../lib/interfaces';

export class Config {
  private configPath?: string;
  private useYml = false;
  private isScriptFile = false;
  private readonly cliOptions: StestOptions;
  private readonly projectPath = path.resolve('../../../');
  private static configuration: ConfigType | undefined = {};

  constructor(options: StestOptions) {
    this.cliOptions = options;
  }

  public async handleConfiguration(): Promise<void> {
    await this.setConfigPath();
    Config.configuration = this.configPath
      ? await this.parseConfig()
      : undefined;
  }

  public static getConfig<K extends keyof ConfigType>(
    key?: K,
  ): ConfigType | ConfigType[K] | undefined {
    if (this.configuration) {
      return key ? this.configuration[key] : this.configuration;
    }
    return undefined;
  }

  private async setConfigPath(): Promise<void> {
    const configFileNames = [
      'stest.config.json',
      'stest.config.yml',
      'stest.config.js',
      'stest.config.ts',
    ];

    if (this.cliOptions?.config) {
      await this.setConfigPathIterator([this.cliOptions.config]);
    } else {
      await this.setConfigPathIterator(configFileNames);
    }
  }

  private async setConfigPathIterator(
    configFileNames: string[],
  ): Promise<void> {
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

  private async parseConfig(): Promise<ConfigType | undefined> {
    if (this.isScriptFile) {
      return this.importConfigFromScript(this.configPath!);
    } else {
      const fileContent = await this.readConfigFile();
      return fileContent ? this.parseFileContent(fileContent) : undefined;
    }
  }

  private async readConfigFile(): Promise<string | Buffer> {
    return fs.promises.readFile(this.configPath!);
  }

  private parseFileContent(content: string | Buffer): ConfigType {
    const contentStr = content.toString();
    return this.useYml ? YAML.parse(contentStr) : JSON.parse(contentStr);
  }

  private async importConfigFromScript(
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
