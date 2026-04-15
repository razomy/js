import * as path from 'path';
import * as abstracts from '@razomy/abstracts';
import * as fs from '@razomy/fs';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function renameSlugToRazomy(path_: abstracts.graphs.PathString) {
  const dir = path.dirname(path_);
  const res = path.join(dir, languagesProgrammingFs.RAZOMY_OUTPUT[0]);
  fs.rename(path_, res);
}
