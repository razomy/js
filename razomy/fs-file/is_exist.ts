import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function isExist(filePath: abstractions.components.SourcePathString) {
  return fs.existsSync(filePath);
}
