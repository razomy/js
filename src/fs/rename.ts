import fs from 'fs';
import {SourcePath} from "razomy.js/fs/path";

export function rename(a: SourcePath, b: SourcePath) {
  fs.renameSync(a, b)
}