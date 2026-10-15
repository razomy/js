import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function setSync(filePath: abstractions.components.FilePathString, content: string) {
  return fs.writeFileSync(filePath, content, 'utf8');
}
