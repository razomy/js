import {String} from 'razomy.string';

export function isString(string: unknown): string is String {
  return typeof string === 'string';
}


