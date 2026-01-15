import { execSync } from 'node:child_process'
import {parse_status} from './parse_status';

export function get_status_sync(dir_path: string) {
    var cmd = 'git status --porcelain -b';
    const stdout = execSync(cmd, {cwd: dir_path, encoding: 'utf-8'});
    return parse_status(stdout);
}
