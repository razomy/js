import fs from 'fs';
import {SourcePathString} from "razomy.path/string/path_string";

function rename(a: SourcePathString, b: SourcePathString) {
  fs.renameSync(a, b)
}

export default rename;
