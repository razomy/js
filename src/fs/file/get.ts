import fs from 'fs';
import {FilePathString} from 'razomy/path/string';

export function get(file_path: FilePathString) {
  return fs.readFileSync(file_path, 'utf8');
}
