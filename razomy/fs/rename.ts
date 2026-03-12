import fs from 'fs';
import type { SourcePathString } from '@razomy/abstracts/graphs';

export function rename(a: SourcePathString, b: SourcePathString) {
  fs.renameSync(a, b);
}
