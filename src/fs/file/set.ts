import fs from 'fs';
import {FilePathString} from 'razomy.path/string/path_string';

export function set(file_path: FilePathString, content: string) {
  return fs.writeFileSync(file_path, content, 'utf8');
}
