import {execute} from '@razomy/shell';

export async function getGitCommitsId(dirPath: string, commitCount: number = 100) {


// Command to retrieve the last commits with commit IDs and names
  const command = `git --git-dir=${dirPath}/.git log --pretty=format:%h%x09%s%x09%ad -n ${commitCount} --date=iso`;

  const stdout = String(await execute(command, {}));
  const lines = stdout.trim().split('\n');

  // Create an array to store the commit information
  let commits: { id: string, commitName: string, date: string }[] = [];

  // Process each line to extract the commit ID and name
  lines.forEach((line) => {
    const [commitId, commitName, commitDate] = line.split('\t');
    commits.push({id: commitId, commitName, date: commitDate});
  });

  return commits.reverse();
}