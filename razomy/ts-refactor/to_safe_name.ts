import {reservedNamesJs} from '@razomy/languages-programming-fs';
import {camelCase} from '@razomy/string-case';

export function toSafeName(name: string) {
  let newName = camelCase(name);
  if (reservedNamesJs[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}

