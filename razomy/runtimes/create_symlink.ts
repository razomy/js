import * as fs from "node:fs";
import { IS_WIN } from "./get_exe_path";
import {linkExists} from "./link_exists";

export function createSymlink(targetDir: string, linkPath: string) {
    if (linkExists(linkPath)) {
        fs.rmSync(linkPath, {force: true, recursive: true});
    }

    const linkType = IS_WIN ? 'junction' : 'dir';
    fs.symlinkSync(targetDir, linkPath, linkType);
}
