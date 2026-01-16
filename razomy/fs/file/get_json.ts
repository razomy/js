import fs from 'fs';

export function get_json(file_path) {
    return JSON.parse(fs.readFileSync(file_path, 'utf8'));
}
