import * as fs from 'fs';
import * as path from 'path';
import {is_exist} from "razomy.js/fs/read";

export interface BrokenLink {
  linkPath: string;
  targetPath: string;
}

export function getInvalidSymlinks() {
  let invalidLinks: BrokenLink[] = [];

  function iterate_if_invalid_link({stats: entry, path: path_}) {
    if (entry.isSymbolicLink()) {
      const targetPath = fs.readlinkSync(path_);
      const resolvedTargetPath = path.resolve(path.dirname(path_), targetPath);

      if (!(is_exist(resolvedTargetPath))) {
        invalidLinks.push({linkPath: path_, targetPath: targetPath});
      }
    }
  }

  return {invalidLinks, iterate_if_invalid_link};
}
