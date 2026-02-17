import fs from 'fs';
import {SourcePathString} from '@razomy/path-string';

export function rename(a: SourcePathString, b: SourcePathString) {
  fs.renameSync(a, b)
}


