import fs from 'fs';
import { FilePathString } from 'razomy.path/string/path_string';

export function write_file_json(file_path: FilePathString, content, is_format: boolean = false) {
    return fs.writeFileSync(file_path, JSON.stringify(content, null, is_format ? 2 : 0), 'utf8');
}
