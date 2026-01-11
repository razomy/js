import * as fs from 'fs';
import * as path from 'path';
import {is_exist} from 'src/fs/file/read';
import {CatchFn} from 'razomy/exceptions/collect';
import {ArgumentException} from 'razomy/exceptions/argument_exception';

export class InvalidLinkException extends ArgumentException<{ linkPath: string, targetPath: string }> {
  constructor(public linkPath: string,
              public targetPath: string) {
    super('invalid targetPath', {linkPath, targetPath});
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
