import * as path from 'path';
import * as shell from '@razomy/shell';
import * as fsFile from '@razomy/fs-file';
import * as async from '@razomy/async';
import * as git from "@razomy/git";

export async function gitFileToNewGitFile(repositoryPath, repositorynewPath, fileSubPath = '/data/start.txt') {
  repositoryPath = path.resolve(repositoryPath);
  repositorynewPath = path.resolve(repositorynewPath);

  const commits = await git.getCommitsId(repositoryPath);
  for (const commit of commits) {
    const index = commits.indexOf(commit);

    const checkoutCommand = `git checkout ${commit.id}`;
    await async.tryPromise(shell.execute(checkoutCommand, repositoryPath));

    const data = fsFile.getSync(repositoryPath + fileSubPath);
    fsFile.setSync(repositorynewPath + fileSubPath, data);

    const commitCommand = `git add . && git commit --date "${commit.date}" -m "${commit.commitName}"`;
    await async.tryPromise(shell.execute(commitCommand, repositorynewPath));

    console.log(`${index + 1}. Commit ID: ${commit.id}`);
    console.log(`   Commit Name: ${commit.commitName}`);
    console.log(`   Commit Date: ${commit.date}`);
  }
}
