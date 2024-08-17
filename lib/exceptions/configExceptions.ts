export class ConfigException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}
