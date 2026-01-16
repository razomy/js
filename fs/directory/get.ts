import fs from 'fs';
import {DirPathString} from 'razomy.path/string/path_string';

export function get(dir_path: DirPathString): string[] {
  return fs.readdirSync(dir_path)
}


