import fs from 'fs';
import {SourcePathString} from "razomy.js/fs/pathString";

export function rename(a: SourcePathString, b: SourcePathString) {
  fs.renameSync(a, b)
}