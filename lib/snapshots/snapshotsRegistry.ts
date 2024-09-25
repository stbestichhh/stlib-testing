import { SnapshotReg } from '../types';
import { SnapshotException } from '../exceptions';

export class SnapshotsRegistry {
  private static snapshotsRegistry: SnapshotReg[] = [];

  public static push(reg: SnapshotReg) {
    this.snapshotsRegistry.push(reg);
  }

  public static getReg(name: string) {
    const reg = this.snapshotsRegistry.find((reg) => reg.name === name);

    if (!reg) {
      throw new SnapshotException(`No snapshot found with name ${name}`);
    }

    return reg;
  }

  public static get() {
    return Array.from(this.snapshotsRegistry);
  }

  public static last() {
    return this.snapshotsRegistry[this.snapshotsRegistry.length - 1];
  }
}
