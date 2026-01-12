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

      const commitHashes = log.all.reverse();
      resolve(commitHashes);
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
    const getPreviousContent = await git.show([`${from.hash}:${filePath}`]);
    const getCurrentContent = await git.show([`${to.hash}:${filePath}`]);

    const changes = strings_to_delta_strings(getPreviousContent, getCurrentContent);

    const commit:ActorDatetimeDeltaString = {
      datetime: to.date,
      actor: to.author_name,
      deltas: changes,
    };

    history.commits.push(commit);
  }

  const snapshot1 = addss_to_string('', history.commits);

  const lastCommit = await git.show([`${commits.at(-1)!.hash}:${filePath}`]);

  if (snapshot1 !== lastCommit) {
    throw 'error';
  }

  return history;
}


async function git_file_commits_to_commit_json_file(
  repositoryPathRoot: string,
  fileSubPath: string,
) {

  const newFFile = path.join(repositoryPathRoot, fileSubPath + '.json');
  fs.writeFileSync(
    newFFile,
    '',
    'utf8',
  );

  // Usage example
  const history = await compare_versions(repositoryPathRoot, fileSubPath);
  const historyJson = JSON.stringify(history);

  fs.writeFileSync(
    newFFile,
    historyJson,
    'utf8',
  );

}

