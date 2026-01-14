import {String} from 'razomy.string/string';

export default function is_string(string: unknown): string is String {
  return typeof string === 'string';
}


