import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function rename(a: abstractions.path.SourcePath, b: abstractions.path.SourcePath) {
  fs.renameSync(a, b);
}
