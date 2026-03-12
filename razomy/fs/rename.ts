import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function rename(a: abstracts.graphs.SourcePathString, b: abstracts.graphs.SourcePathString) {
  fs.renameSync(a, b);
}
