import fs from 'fs';
import {tryCreate} from 'razomy.fs/directory/try_create';
import path from 'path';
import {FilePathString} from 'razomy.path/string/path_string';

export function trySet(filePath: FilePathString, content) {
  tryCreate(path.dirname(filePath));
  return fs.writeFileSync(filePath, content, 'utf8');
}
