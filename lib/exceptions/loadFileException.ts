export class LoadFileException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'LoadFileError';
  }
}
