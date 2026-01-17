import fs from 'fs';
import {FilePathString} from 'razomy.path/string';

export function get(filePath: FilePathString) {
  return fs.readFileSync(filePath, 'utf8');
}
