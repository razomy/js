import type { PathString } from '@razomy/abstracts/graphs';
import { isWithGit } from './is_with_git';

export function isWithoutGit(path: PathString) {
  return !isWithGit(path);
}
