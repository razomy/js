import * as abstractions from '@razomy/abstractions';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isMacDsStoreKey(slug: abstractions.components.Slug) {
  return slug.endsWith(languagesProgrammingFs.MAC_DS_STORE_FILE);
}
