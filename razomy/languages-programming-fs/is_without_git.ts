import * as abstracts from '@razomy/abstracts';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isWithoutGit(path: abstracts.components.PathString) {
  return !languagesProgrammingFs.isWithGit(path);
}
