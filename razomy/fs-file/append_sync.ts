import fs from 'fs';
import * as abstractions from '@razomy/abstractions';

export function appendSync(filePath: abstractions.fs.FilePath, content: string) {
  fs.appendFileSync(filePath, content, 'utf8');
}
