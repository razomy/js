import fs from 'fs';
import * as abstracts from '@razomy/abstracts';

export function rename(a: abstracts.domains.SourcePathString, b: abstracts.domains.SourcePathString) {
  fs.renameSync(a, b);
}
