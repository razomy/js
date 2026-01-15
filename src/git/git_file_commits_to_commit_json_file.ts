import fs from 'fs';
import path from 'path';
import {compare_versions} from './compare_versions';

export async function git_file_commits_to_commit_json_file(
  repository_path_root: string,
  file_sub_path: string,
) {

  const new_ffile = path.join(repository_path_root, file_sub_path + '.json');
  fs.writeFileSync(
    new_ffile,
    '',
    'utf8',
  );

  // Usage example
  const history = await compare_versions(repository_path_root, file_sub_path);
  const history_json = JSON.stringify(history);

  fs.writeFileSync(
    new_ffile,
    history_json,
    'utf8',
  );

}
