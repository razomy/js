import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import {Commit, snapshot} from 'razomy.js/vcs/vcs';
import {getCommitChanges} from 'razomy.js/vcs/vcs';

function getAllCommitHashes(git) {
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

async function compareVersions(repoPath, filePath) {
  const git = simpleGit(repoPath);
  const commits = await getAllCommitHashes(git);

  const history = {
    commits: [] as Commit[],
  };

  for (let i = 1; i < commits.length; i++) {
    const from = commits[i - 1];
    const to = commits[i];
    const getPreviousContent = await git.show([`${from.hash}:${filePath}`]);
    const getCurrentContent = await git.show([`${to.hash}:${filePath}`]);

    const changes = getCommitChanges(getPreviousContent, getCurrentContent);

    const commit = {
      id: to.hash,
      date: to.date,
      user: to.author_name,
      changes: changes,
    };

    history.commits.push(commit);
  }

  const snapshot1 = snapshot('', history.commits);

  const lastCommit = await git.show([`${commits.at(-1)!.hash}:${filePath}`]);

  if (snapshot1 !== lastCommit) {
    throw 'error';
  }

  return history;
}


async function git_files_to_single_diff_list_json(
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
  const history = await compareVersions(repositoryPathRoot, fileSubPath);
  const historyJson = JSON.stringify(history);

  fs.writeFileSync(
    newFFile,
    historyJson,
    'utf8',
  );

}

