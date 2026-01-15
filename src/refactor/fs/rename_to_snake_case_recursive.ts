import {get} from 'src/fs/dict/get';

import path from 'path';
import fs from 'fs';
import {to_snake_case} from 'src/string/to_snake_case';

export function rename_to_snake_case_recursive(dir_path: string, must_include: string, must_not_include) {
  let files = get(dir_path);
  files = files.map(i => i.substring(dir_path.length))
  files = files.filter(i => i.includes(must_include))
  files = files.filter(i => !i.includes(must_not_include))
  for (const files_key of files) {
    const snack_case = to_snake_case(files_key);
    if (files_key != snack_case) {
      console.log('rename', files_key, snack_case);
      fs.renameSync(path.join(dir_path, files_key), path.join(dir_path, snack_case))
    }
  }
}
