import path from 'path';
import {execute_async} from 'razomy/shell/execute_async';
import {read_file} from 'src/fs/file/read';
import {try_async} from "razomy/async/promise";
import {write_file} from 'razomy/fs/file/write';


export async function get_git_commits_id(dir_path: string, commitCount: number = 100) {


// Command to retrieve the last commits with commit IDs and names
  const command = `git --git-dir=${dir_path}/.git log --pretty=format:%h%x09%s%x09%ad -n ${commitCount} --date=iso`;

  const stdout = String(await execute_async(command, {}));
  const lines = stdout.trim().split('\n');

  // Create an array to store the commit information
  let commits: { id: string, commitName: string, date: string }[] = [];

  // Process each line to extract the commit ID and name
  lines.forEach((line) => {
    const [commitID, commitName, commitDate] = line.split('\t');
    commits.push({id: commitID, commitName, date: commitDate});
  });

  return commits.reverse();
}

async function git_file_to_new_git_file(
  repositoryPath,
  repositorynewPath,
  fileSubPath = '/data/start.txt',
) {
  repositoryPath = path.resolve(repositoryPath);
  repositorynewPath = path.resolve(repositorynewPath);

  const commits = await get_git_commits_id(repositoryPath);
  for (const commit of commits) {
    const index = commits.indexOf(commit);

    const checkoutCommand = `git checkout ${commit.id}`;
    await try_async(execute_async(checkoutCommand, {cwd: repositoryPath}));

    const data = read_file(repositoryPath + fileSubPath);
    write_file(repositorynewPath + fileSubPath, data);

    const commitCommand = `git add . && git commit --date "${commit.date}" -m "${commit.commitName}"`;
    await try_async(execute_async(commitCommand, {cwd: repositorynewPath}));

    console.log(`${index + 1}. Commit ID: ${commit.id}`);
    console.log(`   Commit Name: ${commit.commitName}`);
    console.log(`   Commit Date: ${commit.date}`);
  }
}
