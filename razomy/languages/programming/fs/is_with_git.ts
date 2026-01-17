import path from 'path';
import {isExist} from 'razomy.fs/file/is_exist';
import {PathString} from 'razomy.path/string/path_string';
import {gitSlug} from './is_mac_ds_store_key_argument_exception';

export function isWithGit(path_: PathString) {
  return isExist(path.join(path_, gitSlug))
}
