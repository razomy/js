import fs from 'fs';
import { FilePathString } from 'razomy.path/string/path_string';

export function write_file(file_path: FilePathString, content) {
    return fs.writeFileSync(file_path, content, 'utf8');
}
