export class TimeoutException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}
