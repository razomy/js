import * as path from "path";
import { PathString } from "razomy.path/string/path_string";
import rename from "razomy.fs/rename";
import {razomy_output} from './is_output';

export function rename_slug_to_razomy(path_: PathString) {
    const dir = path.dirname(path_);
    const res = path.join(dir, razomy_output[0]);
    rename(path_, res)
}
