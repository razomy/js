import * as path from 'path';
import * as abstractions from '@razomy/abstractions';
import * as fs from '@razomy/fs';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function renameSlugToRazomy(path_: abstractions.path.Path) {
  const dir = path.dirname(path_);
  const res = path.join(dir, languagesProgrammingFs.RAZOMY_OUTPUT[0]);
  fs.rename(path_, res);
}
