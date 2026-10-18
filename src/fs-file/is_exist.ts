import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function isExist(filePath: abstractions.path.SourcePath) {
  return fs.existsSync(filePath);
}
