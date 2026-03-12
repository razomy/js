import fs from 'fs';
import * as path from 'path';
import { InvalidLinkException } from './invalid_link_exception';
import * as fsFile from "@razomy/fs-file";
import * as exceptions from "@razomy/exceptions";

export function getInvalidSymlinks(catchFn: exceptions.CatchFn) {
  function iterateIfInvalidLink({ stats: entry, path: path_ }) {
    if (entry.isSymbolicLink()) {
      const targetPath = fs.readlinkSync(path_);
      const resolvedTargetPath = path.resolve(path.dirname(path_), targetPath);
      catchFn(() => {
        if (!fsFile.isExist(resolvedTargetPath)) {
          throw new InvalidLinkException(path_, targetPath);
        }
      });
    }
  }

  return { iterateIfInvalidLink };
}
