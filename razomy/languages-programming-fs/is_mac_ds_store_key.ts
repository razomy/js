import * as abstracts from '@razomy/abstracts';
import * as languagesProgrammingFs from "@razomy/languages-programming-fs";

export function isMacDsStoreKey(slug: abstracts.graphs.Slug) {
  return slug.endsWith(languagesProgrammingFs.MAC_DS_STORE_FILE);
}
