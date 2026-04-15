import * as abstracts from '@razomy/abstracts';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isGitKey(slug: abstracts.graphs.Slug) {
  return slug === languagesProgrammingFs.GIT_SLUG;
}
