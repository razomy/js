import path from "node:path";
import * as shell from "@razomy/shell";

export async function getPublishVersion(path_: string) {
    return (await shell.tryExecuteSync<string>(`npm view ${path_.replace('../', '@razomy/')} version`, path.resolve(path_)))?.trim();
}
