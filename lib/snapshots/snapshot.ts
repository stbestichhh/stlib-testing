import path from 'node:path';
import fs from 'fs';
import { SnapshotException } from '../exceptions';

export class Snapshot {
  private static readonly projectPath = path.resolve('../../../');
  private static readonly snapshotsDirectoryPath = path.join(
    this.projectPath,
    '.stest/snapshots',
  );

  private static snapshotPath(name: string) {
    return path.join(this.snapshotsDirectoryPath, `${name}.snapshot.json`);
  }

  private static checkSnapshotDirExists() {
    try {
      fs.accessSync(this.snapshotsDirectoryPath);
    } catch (e) {
      fs.mkdirSync(this.snapshotsDirectoryPath, { recursive: true });
    }
  }

  private static removeSnapshot(name: string) {
    fs.rmSync(this.snapshotPath(name));
  }

  public static save(name: string, data: any) {
    const snapshotPath = this.snapshotPath(name);

    this.checkSnapshotDirExists();
    fs.writeFileSync(snapshotPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  public static match(name: string, data: any) {
    const snapshotPath = this.snapshotPath(name);
    const storedData = JSON.parse(fs.readFileSync(snapshotPath, 'utf-8'));

    if (JSON.stringify(storedData) !== JSON.stringify(data)) {
      throw new SnapshotException(
        `Expected ${JSON.stringify(storedData)} to match ${JSON.stringify(data)}`,
      );
    }

    this.removeSnapshot(name);
  }
}
