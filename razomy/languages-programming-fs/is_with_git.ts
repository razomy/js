import * as path from 'path';
import * as fsFile from '@razomy/fs-file';
import * as abstracts from '@razomy/abstracts';
import * as languagesProgrammingFs from "@razomy/languages-programming-fs";

export function isWithGit(path_: abstracts.graphs.PathString) {
  return fsFile.isExist(path.join(path_, languagesProgrammingFs.GIT_SLUG));
}
