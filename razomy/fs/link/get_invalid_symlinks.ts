import fs from 'fs';
import path from 'path';
import {is_exist} from '../file';
import {InvalidLinkException} from './invalid_link_exception';
import {CatchFn} from 'razomy.exceptions';

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