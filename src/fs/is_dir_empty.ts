import fs from 'fs';
export default function is_dir_empty(path_) {
    const files = fs.readdirSync(path_);
    return files.length === 0;
}
