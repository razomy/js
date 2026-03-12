import fs from 'fs';
import type { DirPathString } from '@razomy/abstracts/graphs';

export function get(dirPath: DirPathString): string[] {
  return fs.readdirSync(dirPath);
}
