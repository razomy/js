import fs from 'fs';
import {create_directory_if_not_exists} from 'razomy.fs/directory/create';
import path from 'path';
import {FilePathString} from 'razomy.path/string/path_string';

export function try_write_file(file_path: FilePathString, content) {
  create_directory_if_not_exists(path.dirname(file_path));
  return fs.writeFileSync(file_path, content, 'utf8');
}
