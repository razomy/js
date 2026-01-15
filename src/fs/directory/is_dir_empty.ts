import fs from 'fs';
export function is_dir_empty(path_) {
    const files = fs.readdirSync(path_);
    return files.length === 0;
}
