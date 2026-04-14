import * as fs from "node:fs";

export function linkExists(linkPath: string): boolean {
    try {
        return fs.lstatSync(linkPath).isSymbolicLink() || fs.existsSync(linkPath);
    } catch {
        return false;
    }
}
