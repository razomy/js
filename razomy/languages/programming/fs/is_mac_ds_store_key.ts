import {Slug} from 'razomy.path/string/path_string';
import {macDsStoreFile} from './is_mac_ds_store_key_argument_exception';

export function isMacDsStoreKey(slug: Slug) {
  return slug.endsWith(macDsStoreFile);
}
