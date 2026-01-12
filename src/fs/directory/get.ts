import fs from 'fs';
import {PathString} from 'razomy/path/string/path_string';

function get(path: PathString): string[] {
  return fs.readdirSync(path)
}

export default get;
