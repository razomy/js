import {toSnakeCase} from 'razomy.string/case';
import {reservedNamesJs} from '../../languages/programming/fs';

export function toSafeFilename(name: string) {
  let newName = toSnakeCase(name);
  if (reservedNamesJs[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}