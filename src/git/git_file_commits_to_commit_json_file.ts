import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import {strings_to_delta_strings} from 'razomy/commit/datetime/delta/string/strings_to_delta_strings';
import {ActorDatetimeDeltaString, addss_to_string} from 'razomy/commit/datetime/delta/string/adds';

function get_all_commit_hashes(git) {
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

async function compare_versions(repoPath, filePath) {
  const git = simpleGit(repoPath);
  const commits = await get_all_commit_hashes(git);

  const history = {
    commits: [] as ActorDatetimeDeltaString[],
  };

  for (let i = 1; i < commits.length; i++) {
    const from = commits[i - 1];
    const to = commits[i];
    const get_previous_content = await git.show([`${from.hash}:${filePath}`]);
    const get_current_content = await git.show([`${to.hash}:${filePath}`]);

    const changes = strings_to_delta_strings(get_previous_content, get_current_content);

    const commit:ActorDatetimeDeltaString = {
      datetime: to.date,
      actor: to.author_name,
      deltas: changes,
    };

    history.commits.push(commit);
  }

  const snapshot1 = addss_to_string('', history.commits);

  const last_commit = await git.show([`${commits.at(-1)!.hash}:${filePath}`]);

  if (snapshot1 !== last_commit) {
    throw 'error';
  }

  return history;
}


async function git_file_commits_to_commit_json_file(
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

