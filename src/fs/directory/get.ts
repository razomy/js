import fs from 'fs';
import {PathString} from 'razomy/path/string/pathString';

export function get(path: PathString): string[] {
  return fs.readdirSync(path)
}
