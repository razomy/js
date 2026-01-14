import fs from 'fs';
import {PathString} from 'razomy.path/string/path_string';

export default function get(path: PathString): string[] {
  return fs.readdirSync(path)
}


