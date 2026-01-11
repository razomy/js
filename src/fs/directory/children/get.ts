import fs from 'fs';
import {PathString} from 'razomy.js/fs/pathString';

export function get(path: PathString): string[] {
  return fs.readdirSync(path)
}
