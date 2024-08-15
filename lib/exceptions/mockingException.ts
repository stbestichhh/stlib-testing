export class MockingException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'MockError';
  }
}
