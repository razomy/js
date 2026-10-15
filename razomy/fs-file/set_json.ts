import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function setJson(filePath: abstractions.components.FilePathString, content, isFormat: boolean = false) {
  const data = isFormat ? JSON.stringify(content, null, 2) + '\n' : JSON.stringify(content, null, 0);
  return fs.writeFileSync(filePath, data, 'utf8');
}
