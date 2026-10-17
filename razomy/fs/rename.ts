import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function rename(a: abstractions.components.SourcePath, b: abstractions.components.SourcePath) {
  fs.renameSync(a, b);
}
