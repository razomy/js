import fs from "fs";
import { SourcePathString } from "razomy.path/string/path_string";

export function is_exist(file_path: SourcePathString) {
    return fs.existsSync(file_path);
}
