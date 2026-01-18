import {reservedNamesJs} from '../languages.programming.fs';
import {toCamelCase} from 'razomy.string.case';

export function toSafeName(name: string) {
  let newName = toCamelCase(name);
  if (reservedNamesJs[newName] || newName == '') {
    newName = newName + '_';
  }
  return newName;
}

