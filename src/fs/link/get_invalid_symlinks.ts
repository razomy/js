import * as fs from 'fs';
import * as path from 'path';
import {is_exist} from 'src/fs/file/read';
import {CatchFn} from 'razomy.exceptions/collect';
import {ArgumentException} from 'razomy.exceptions/argument_exception';

export class InvalidLinkException extends ArgumentException<{ link_path: string, target_path: string }> {
  constructor(public link_path: string,
              public target_path: string) {
    super('invalid targetPath', {link_path, target_path});
  }
}


export function get_invalid_symlinks(catch_fn: CatchFn) {

  function iterate_if_invalid_link({stats: entry, path: path_}) {
    if (entry.isSymbolicLink()) {
      const target_path = fs.readlinkSync(path_);
      const resolved_target_path = path.resolve(path.dirname(path_), target_path);
      catch_fn(() => {

        if (!(is_exist(resolved_target_path))) {
          throw new InvalidLinkException(path_, target_path);
        }
      });
    }
  }

  return {iterate_if_invalid_link};
}

export default get_invalid_symlinks;
