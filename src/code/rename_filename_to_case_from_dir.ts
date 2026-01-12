import get from 'razomy/fs/dict/get';

import path from 'path';
import fs from 'fs';
import snake_case_string from "razomy/string/snake_case_string";

export function rename_to_snack_case_recursive(dir_path: string, must_include: string, must_not_include) {
  let files = get(dir_path);
  files = files.map(i => i.substring(dir_path.length))
  files = files.filter(i => i.includes(must_include))
  files = files.filter(i => !i.includes(must_not_include))
  for (const files_key of files) {
    const snack_case = snake_case_string(files_key);
    if (files_key != snack_case) {
      console.log('rename', files_key, snack_case);
      fs.renameSync(path.join(dir_path, files_key), path.join(dir_path, snack_case))
    }
  }
}

export function rename_to_snack_case_recursive_ts(dir_path: string) {
  return rename_to_snack_case_recursive(dir_path, '.ts', 'node_modules');
}