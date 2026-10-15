import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function rename(a: abstractions.components.SourcePathString, b: abstractions.components.SourcePathString) {
  fs.renameSync(a, b);
}
