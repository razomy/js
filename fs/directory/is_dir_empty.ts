import fs from 'fs';
export function is_dir_empty(path) {
    const files = fs.readdirSync(path);
    return files.length === 0;
}
