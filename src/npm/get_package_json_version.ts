import path from "node:path";
import * as fss from "@razomy/fss";

export function getPackageJsonVersion(path_: string) {
    return fss.file.getJson(path.resolve(path_ + '/package.json')).version;
}
