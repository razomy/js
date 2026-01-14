import fs from "fs";

export function delete_async(file_path: string) {
    return fs.rmSync(file_path, {recursive: true, force: true});
}
