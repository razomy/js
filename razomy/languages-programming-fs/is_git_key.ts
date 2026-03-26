import { GIT_SLUG } from './is_mac_ds_store_key_argument_exception';
import * as abstracts from '@razomy/abstracts';

export function isGitKey(slug: abstracts.graphs.Slug) {
  return slug === GIT_SLUG;
}
