import path from 'path';
import {execute_async} from 'razomy.shell/execute_async';
import {get} from 'razomy.fs/file/get';
import {set} from 'razomy.fs/file/set';
import {try_promise} from 'razomy.async/try_promise';
import {get_git_commits_id} from './get_git_commits_id';


export async function git_file_to_new_git_file(
  repository_path,
  repositorynew_path,
  file_sub_path = '/data/start.txt',
) {
  repository_path = path.resolve(repository_path);
  repositorynew_path = path.resolve(repositorynew_path);

  const commits = await get_git_commits_id(repository_path);
  for (const commit of commits) {
    const index = commits.indexOf(commit);

    const checkout_command = `git checkout ${commit.id}`;
    await try_promise(execute_async(checkout_command, {cwd: repository_path}));

    const data = get(repository_path + file_sub_path);
    set(repositorynew_path + file_sub_path, data);

    const commit_command = `git add . && git commit --date "${commit.date}" -m "${commit.commit_name}"`;
    await try_promise(execute_async(commit_command, {cwd: repositorynew_path}));

    console.log(`${index + 1}. Commit ID: ${commit.id}`);
    console.log(`   Commit Name: ${commit.commit_name}`);
    console.log(`   Commit Date: ${commit.date}`);
  }
}
