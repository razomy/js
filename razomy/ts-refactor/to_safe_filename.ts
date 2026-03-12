import * as stringCase from '@razomy/string-case';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function toSafeFilename(name: string) {
  let newName = stringCase.snakeCase(name);
  if (languagesProgrammingFs.reservedNamesJs[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}
