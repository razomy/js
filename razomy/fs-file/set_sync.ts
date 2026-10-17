import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function setSync(filePath: abstractions.fs.FilePath, content: string) {
  return fs.writeFileSync(filePath, content, 'utf8');
}
