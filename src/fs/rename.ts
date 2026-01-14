import fs from 'fs';
import {SourcePathString} from 'razomy.path/string/path_string';
export default function rename(a: SourcePathString, b: SourcePathString) {
  fs.renameSync(a, b)
}


