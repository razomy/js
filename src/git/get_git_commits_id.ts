import execute_async from 'src/shell/execute_async';

export default async function get_git_commits_id(dir_path: string, commitCount: number = 100) {


// Command to retrieve the last commits with commit IDs and names
  const command = `git --git-dir=${dir_path}/.git log --pretty=format:%h%x09%s%x09%ad -n ${commitCount} --date=iso`;

  const stdout = String(await execute_async(command, {}));
  const lines = stdout.trim().split('\n');

  // Create an array to store the commit information
  let commits: { id: string, commit_name: string, date: string }[] = [];

  // Process each line to extract the commit ID and name
  lines.forEach((line) => {
    const [commit_id, commit_name, commit_date] = line.split('\t');
    commits.push({id: commit_id, commit_name, date: commit_date});
  });

  return commits.reverse();
}