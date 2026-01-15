import fs from 'fs';
import {read_file_json} from './read_file_json';

export function try_read_file_json(file_path) {
    if (!fs.existsSync(file_path)) {
    return null;
    }

    return read_file_json(file_path);
}
