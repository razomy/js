import {Slug} from 'razomy.path/string/path_string';
import {gitSlug} from './is_mac_ds_store_key_argument_exception';

export function isGitKey(slug: Slug) {
  return slug === gitSlug;
}
