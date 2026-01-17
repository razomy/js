import fs from 'fs';
import {DirPathString} from 'razomy.path/string/path_string';

export function get(dirPath: DirPathString): string[] {
  return fs.readdirSync(dirPath)
}


