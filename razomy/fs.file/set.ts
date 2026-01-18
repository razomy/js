import fs from 'fs';
import {FilePathString} from 'razomy.path.string';

export function set(filePath: FilePathString, content: string) {
  return fs.writeFileSync(filePath, content, 'utf8');
}
