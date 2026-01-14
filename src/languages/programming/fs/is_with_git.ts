import * as path from "path";
import { is_exist } from "razomy.fs/file/read";
import { PathString } from "razomy.path/string/path_string";
import {git_slug} from './is_packages';

export function is_with_git(path_: PathString) {
    return is_exist(path.join(path_, git_slug))
}
