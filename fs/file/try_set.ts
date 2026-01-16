import fs from 'fs';
import {try_create} from 'razomy.fs/directory/try_create';
import path from 'path';
import {FilePathString} from 'razomy.path/string/path_string';

export function try_set(file_path: FilePathString, content) {
  try_create(path.dirname(file_path));
  return fs.writeFileSync(file_path, content, 'utf8');
}
