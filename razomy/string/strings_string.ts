import {String} from 'razomy.string/string';

export function stringsString(strings: String[]) {
  let result: String = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
  }

  return result;
}


