import * as abstracts from '@razomy/abstracts';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isWithoutGit(path: abstracts.graphs.PathString) {
  return !languagesProgrammingFs.isWithGit(path);
}
