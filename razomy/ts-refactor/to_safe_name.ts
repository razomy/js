import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function toSafeName(newName:string) {
  if (languagesProgrammingFs.RESERVED_NAMES_JS[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}
