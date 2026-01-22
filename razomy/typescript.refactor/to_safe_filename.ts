import {snakeCase} from 'razomy.string.case';
import {reservedNamesJs} from 'razomy.languages.programming.fs';

export function toSafeFilename(name: string) {
  let newName = snakeCase(name);
  if (reservedNamesJs[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}