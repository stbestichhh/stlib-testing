import path from 'node:path';
import fs from 'fs';

export class Snapshot {
  private lastSnapshotName: string;
  private readonly projectPath = path.resolve('../../../');
  private readonly snapshotsDirectoryPath = path.join(
    this.projectPath,
    '.stest/snapshots',
  );

  constructor(name: string, data: any) {
    const snapshotPath = this.snapshotPath(name);

    this.checkSnapshotDirExists();
    fs.writeFileSync(snapshotPath, JSON.stringify(data, null, 2), 'utf-8');

    this.lastSnapshotName = name;
  }

  public match(data: any, name: string = this.lastSnapshotName) {
    const snapshotPath = this.snapshotPath(name);
    const storedData = JSON.parse(fs.readFileSync(snapshotPath, 'utf-8'));

    if (JSON.stringify(storedData) !== JSON.stringify(data)) {
      return false;
    }
    this.removeSnapshot(name);
    return true;
  }

  private snapshotPath(name: string) {
    return path.join(this.snapshotsDirectoryPath, `${name}.snapshot.json`);
  }

  private checkSnapshotDirExists() {
    try {
      fs.accessSync(this.snapshotsDirectoryPath);
    } catch (e) {
      fs.mkdirSync(this.snapshotsDirectoryPath, { recursive: true });
    }
  }

  private removeSnapshot(name: string) {
    fs.rmSync(this.snapshotPath(name));
  }
}
