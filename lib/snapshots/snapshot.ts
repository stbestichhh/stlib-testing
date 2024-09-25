import { Snapshot } from './snapshotClass';
import { SnapshotsRegistry } from './snapshotsRegistry';

export const shot = (name: string, data: any) => {
  const snapshot = new Snapshot(name, data);
  SnapshotsRegistry.push({ name, snapshot });
};
