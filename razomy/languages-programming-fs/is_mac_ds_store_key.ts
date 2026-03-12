import { macDsStoreFile } from './is_mac_ds_store_key_argument_exception';
import * as abstracts from '@razomy/abstracts';

export function isMacDsStoreKey(slug: abstracts.graphs.Slug) {
  return slug.endsWith(macDsStoreFile);
}
