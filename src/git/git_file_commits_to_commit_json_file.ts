import fs from 'fs';
import path from 'path';
import {compare_versions} from './compare_versions';

export function get_all_commit_hashes(git) {
  return new Promise<{ hash:string, date:string, author_name:string }[]>((resolve, reject) => {
    git.log((err, log) => {
      if (err) {
        reject(err);
        return;
      }

      const commit_hashes = log.all.reverse();
      resolve(commit_hashes);
    });
  });
}

export async function git_file_commits_to_commit_json_file(
  repositoryPathRoot: string,
  fileSubPath: string,
) {

  const new_ffile = path.join(repositoryPathRoot, fileSubPath + '.json');
  fs.writeFileSync(
    new_ffile,
    '',
    'utf8',
  );

  // Usage example
  const history = await compare_versions(repositoryPathRoot, fileSubPath);
  const history_json = JSON.stringify(history);

  fs.writeFileSync(
    new_ffile,
    history_json,
    'utf8',
  );

}
