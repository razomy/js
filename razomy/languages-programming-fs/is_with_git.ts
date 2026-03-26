import * as path from 'path';
import { GIT_SLUG } from './is_mac_ds_store_key_argument_exception';
import * as fsFile from '@razomy/fs-file';
import * as abstracts from '@razomy/abstracts';

export function isWithGit(path_: abstracts.graphs.PathString) {
  return fsFile.isExist(path.join(path_, GIT_SLUG));
}
