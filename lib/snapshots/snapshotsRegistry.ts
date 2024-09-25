import { SnapshotReg } from '../types';

export class SnapshotsRegistry {
  private static snapshotsRegistry: SnapshotReg[] = [];

  public static push(reg: SnapshotReg) {
    this.snapshotsRegistry.push(reg);
  }

  public static getReg(name: string) {
    return this.snapshotsRegistry.find((reg) => reg.name === name);
  }

  public static get() {
    return Array.from(this.snapshotsRegistry);
  }
}
