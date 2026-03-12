import * as languagesProgrammingFs from '@razomy/languages-programming-fs';
import * as stringCase from '@razomy/string-case';

export function toSafeName(name: string) {
  let newName = stringCase.camelCase(name);
  if (languagesProgrammingFs.reservedNamesJs[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}
