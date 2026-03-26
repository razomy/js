import * as path from 'path';
import { RAZOMY_OUTPUT } from './is_output';
import * as abstracts from '@razomy/abstracts';
import * as fs from '@razomy/fs';

export function renameSlugToRazomy(path_: abstracts.graphs.PathString) {
  const dir = path.dirname(path_);
  const res = path.join(dir, RAZOMY_OUTPUT[0]);
  fs.rename(path_, res);
}
