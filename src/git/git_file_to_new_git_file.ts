import path from 'path';
import {execute_async} from 'razomy.shell/execute_async';
import {read} from 'razomy.fs/file/read';
import {write_file} from 'razomy.fs/file/write_file';
import {try_} from 'razomy.async/try_';
import {get_git_commits_id} from './get_git_commits_id';


export async function git_file_to_new_git_file(
  repositoryPath,
  repositorynewPath,
  fileSubPath = '/data/start.txt',
) {
  repositoryPath = path.resolve(repositoryPath);
  repositorynewPath = path.resolve(repositorynewPath);

  const commits = await get_git_commits_id(repositoryPath);
  for (const commit of commits) {
    const index = commits.indexOf(commit);

    const checkout_command = `git checkout ${commit.id}`;
    await try_(execute_async(checkout_command, {cwd: repositoryPath}));

    const data = read(repositoryPath + fileSubPath);
    write_file(repositorynewPath + fileSubPath, data);

    const commit_command = `git add . && git commit --date "${commit.date}" -m "${commit.commit_name}"`;
    await try_(execute_async(commit_command, {cwd: repositorynewPath}));

    console.log(`${index + 1}. Commit ID: ${commit.id}`);
    console.log(`   Commit Name: ${commit.commit_name}`);
    console.log(`   Commit Date: ${commit.date}`);
  }
}
