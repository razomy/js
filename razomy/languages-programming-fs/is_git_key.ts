import * as abstractions from '@razomy/abstractions';
import * as languagesProgrammingFs from '@razomy/languages-programming-fs';

export function isGitKey(slug: abstractions.components.Slug) {
  return slug === languagesProgrammingFs.GIT_SLUG;
}
