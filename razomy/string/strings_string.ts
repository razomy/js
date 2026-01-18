import {String} from 'razomy.string';

export function stringsString(strings: String[]) {
  let result: String = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
  }

  return result;
}


