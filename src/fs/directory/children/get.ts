import fs from 'fs';
import {Path} from 'razomy.js/fs/path';

export function get(path: Path): string[] {
  return fs.readdirSync(path)
}
