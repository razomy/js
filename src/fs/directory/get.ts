import fs from 'fs';
import {PathString} from '../path/pathString';

export function get(path: PathString): string[] {
  return fs.readdirSync(path)
}
