import {getAllFilesInDirectoryFlat} from 'razomy.js/fs/dict/get';
import {string_to_snake_case} from 'razomy.js/string/string_to_snake_case';
import path from 'path';
import fs from 'fs';

export function rename_to_snack_case_recursive(dir_path: string, must_include: string, must_not_include) {
  let files = getAllFilesInDirectoryFlat(dir_path);
  files = files.map(i => i.substring(dir_path.length))
  files = files.filter(i => i.includes(must_include))
  files = files.filter(i => !i.includes(must_not_include))
  for (const filesKey of files) {
    const snack_case = string_to_snake_case(filesKey);
    if (filesKey != snack_case) {
      console.log('rename', filesKey, snack_case);
      fs.renameSync(path.join(dir_path, filesKey), path.join(dir_path, snack_case))
    }
  }
}

export function rename_to_snack_case_recursive_ts(dir_path: string) {
  return rename_to_snack_case_recursive(dir_path, '.ts', 'node_modules');
}