import path from 'path';
import {executeAsync} from 'razomy.shell';
import {get} from 'razomy.fs.file';
import {set} from 'razomy.fs.file';
import {tryPromise} from 'razomy.async';
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
    await tryPromise(executeAsync(checkoutCommand, {cwd: repositoryPath}));

    const data = get(repositoryPath + fileSubPath);
    set(repositorynewPath + fileSubPath, data);

    const commitCommand = `git add . && git commit --date "${commit.date}" -m "${commit.commitName}"`;
    await tryPromise(executeAsync(commitCommand, {cwd: repositorynewPath}));

    console.log(`${index + 1}. Commit ID: ${commit.id}`);
    console.log(`   Commit Name: ${commit.commitName}`);
    console.log(`   Commit Date: ${commit.date}`);
  }
}
