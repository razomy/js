import fs from 'fs';
import {SourcePathString} from "src/fs/path/pathString";

export function rename(a: SourcePathString, b: SourcePathString) {
  fs.renameSync(a, b)
}