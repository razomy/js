import * as fs from "node:fs";
import path from "node:path";

export const isWin = process.platform === 'win32';
export const isMac = process.platform === 'darwin';

export function getExePath(baseDir: string, linuxSubPath: string, winSubPath: string): string {
    const exactPath = path.join(baseDir, isWin ? winSubPath : linuxSubPath);
    if (fs.existsSync(exactPath)) return `"${exactPath}"`;
    return `"${path.basename(isWin ? winSubPath : linuxSubPath)}"`;
}
