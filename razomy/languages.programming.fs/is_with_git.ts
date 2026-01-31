import * as path from 'path';
import {isExist} from 'razomy.fs.file';
import {PathString} from 'razomy.path.string';
import {gitSlug} from './is_mac_ds_store_key_argument_exception';

export function isWithGit(path_: PathString) {
  return isExist(path.join(path_, gitSlug))
}
