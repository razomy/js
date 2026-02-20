import * as path from 'path';
import {execute} from '@razomy/shell';
import {getSync, setSync} from '@razomy/fs-file';
import {tryPromise} from '@razomy/async';
import {getGitCommitsId} from './get_git_commits_id';


export async function gitFileToNewGitFile(
  repositoryPath,
  repositorynewPath,
  fileSubPath = '/data/start.txt',
) {
  repositoryPath = path.resolve(repositoryPath);
  repositorynewPath = path.resolve(repositorynewPath);

  const commits = await getGitCommitsId(repositoryPath);
  for (const commit of commits) {
    const index = commits.indexOf(commit);

    const checkoutCommand = `git checkout ${commit.id}`;
    await tryPromise(execute(checkoutCommand, {cwd: repositoryPath}));

    const data = getSync(repositoryPath + fileSubPath);
    setSync(repositorynewPath + fileSubPath, data);

    const commitCommand = `git add . && git commit --date "${commit.date}" -m "${commit.commitName}"`;
    await tryPromise(execute(commitCommand, {cwd: repositorynewPath}));

    console.log(`${index + 1}. Commit ID: ${commit.id}`);
    console.log(`   Commit Name: ${commit.commitName}`);
    console.log(`   Commit Date: ${commit.date}`);
  }
}
