import type {PathString} from '@razomy/path-string';
import {isWithGit} from './is_with_git';

export function isWithoutGit(path: PathString) {
  return !isWithGit(path)
}
