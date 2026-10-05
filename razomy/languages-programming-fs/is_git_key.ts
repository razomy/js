import * as abstracts from '@razomy/abstracts';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isGitKey(slug: abstracts.components.Slug) {
  return slug === languagesProgrammingFs.GIT_SLUG;
}
