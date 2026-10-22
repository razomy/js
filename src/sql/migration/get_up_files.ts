import * as fs from "node:fs";

export function getUpFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.up.sql'))
    .sort();
}
