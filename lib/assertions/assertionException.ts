export class AssertionException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}
