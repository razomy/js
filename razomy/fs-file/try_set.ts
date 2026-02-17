import fs from 'fs';
import {tryCreate} from '@razomy/fs-directory';
import * as path from 'path';
import {FilePathString} from '@razomy/path-string';

export function trySet(filePath: FilePathString, content) {
  tryCreate(path.dirname(filePath));
  return fs.writeFileSync(filePath, content, 'utf8');
}
