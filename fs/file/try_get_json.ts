import fs from 'fs';
import {get_json} from './get_json';

export function try_get_json(file_path) {
    if (!fs.existsSync(file_path)) {
    return null;
    }

    return get_json(file_path);
}
