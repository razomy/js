import * as fs from "node:fs";
import path from "node:path";

export const IS_WIN = process.platform === 'win32';
export const IS_MAC = process.platform === 'darwin';

export function getExePath(baseDir: string, linuxSubPath: string, winSubPath: string): string {
    const exactPath = path.join(baseDir, IS_WIN ? winSubPath : linuxSubPath);
    if (fs.existsSync(exactPath)) return `"${exactPath}"`;
    return `"${path.basename(IS_WIN ? winSubPath : linuxSubPath)}"`;
}
