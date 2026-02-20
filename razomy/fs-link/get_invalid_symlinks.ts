import fs from 'fs';
import * as path from 'path';
import {isExist} from '@razomy/fs-file';
import {InvalidLinkException} from './invalid_link_exception';
import type {CatchFn} from '@razomy/exceptions';

export function getInvalidSymlinks(catchFn: CatchFn) {

  function iterateIfInvalidLink({stats: entry, path: path_}) {
    if (entry.isSymbolicLink()) {
      const targetPath = fs.readlinkSync(path_);
      const resolvedTargetPath = path.resolve(path.dirname(path_), targetPath);
      catchFn(() => {

        if (!(isExist(resolvedTargetPath))) {
          throw new InvalidLinkException(path_, targetPath);
        }
      });
    }
  }

  return {iterateIfInvalidLink};
}