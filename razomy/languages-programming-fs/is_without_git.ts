import * as abstractions from '@razomy/abstractions';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isWithoutGit(path: abstractions.components.Path) {
  return !languagesProgrammingFs.isWithGit(path);
}
