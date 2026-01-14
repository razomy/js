import fs from "fs";

export function read_file_json(file_path) {
    return JSON.parse(fs.readFileSync(file_path, 'utf8'));
}
