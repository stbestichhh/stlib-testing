export class SnapshotException extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'SnapshotException';
  }
}
