import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function rename(a: abstracts.components.SourcePathString, b: abstracts.components.SourcePathString) {
  fs.renameSync(a, b);
}
