import {PathString} from 'razomy.path/string/path_string';
import {isWithGit} from './is_with_git';

export function isWithoutGit(path: PathString) {
  return !isWithGit(path)
}
