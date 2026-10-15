import * as path from 'path';
import * as fsFile from '@razomy/fs-file';
import * as abstractions from '@razomy/abstractions';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isWithGit(path_: abstractions.components.PathString) {
  return fsFile.isExist(path.join(path_, languagesProgrammingFs.GIT_SLUG));
}
