import { PathLike } from 'node:fs';
import fs from 'fs';

export const isExists = async (path: PathLike) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    return false;
  }
};
