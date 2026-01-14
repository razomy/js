import { PathString } from 'razomy.path/string/path_string';
import is_with_git from './is_with_git';

export default function is_without_git(path: PathString) {
    return !is_with_git(path)
}
