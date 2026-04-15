import * as fs from "node:fs";
import * as runtimes from "@razomy/runtimes";

export function createSymlink(targetDir: string, linkPath: string) {
    if (runtimes.linkExists(linkPath)) {
        fs.rmSync(linkPath, {force: true, recursive: true});
    }

    const linkType = runtimes.IS_WIN ? 'junction' : 'dir';
    fs.symlinkSync(targetDir, linkPath, linkType);
}
