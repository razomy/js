import fs from 'fs';
import {PathString} from 'src/fs/path/pathString';

export function get(path: PathString): string[] {
  return fs.readdirSync(path)
}
