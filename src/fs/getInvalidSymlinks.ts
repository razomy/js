import * as fs from 'fs';
import * as path from 'path';
import {Exception} from "razomy.js/exceptions/exception";
import {is_exist} from "razomy.js/fs/read";
import {CatchFn} from "razomy.js/exceptions/collect";

export class InvalidLinkException extends Exception {
  constructor(public linkPath: string,
              public targetPath: string) {
    super("invalid link", {});
  }
}


export function getInvalidSymlinks(catch_fn: CatchFn) {

  function iterate_if_invalid_link({stats: entry, path: path_}) {
    if (entry.isSymbolicLink()) {
      const targetPath = fs.readlinkSync(path_);
      const resolvedTargetPath = path.resolve(path.dirname(path_), targetPath);
      catch_fn(() => {

        if (!(is_exist(resolvedTargetPath))) {
          throw new InvalidLinkException(path_, targetPath);
        }
      });
    }
  }

  return {iterate_if_invalid_link};
}
