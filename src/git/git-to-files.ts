import path from 'path';
import { executeAsync, tryLogAsync } from 'razomy.js/shells/shell';
import {readFile} from 'razomy.js/fs/read';
import {writeFile} from 'razomy.js/fs/write';


// Execute the command
async function git_to_string_gitted(
    repositoryPath,
repositorynewPath,
fileSubPath = '/data/start.txt',
) {
  repositoryPath = path.resolve(repositoryPath);
  repositorynewPath = path.resolve( repositorynewPath);


  // Specify the number of commits to retrieve
  const commitCount = 73;

// Command to retrieve the last commits with commit IDs and names
  const command = `git --git-dir=${repositoryPath}/.git log --pretty=format:%h%x09%s%x09%ad -n ${commitCount} --date=iso`;

  const stdout = String(await executeAsync(command, {}));
  const lines = stdout.trim().split('\n');

  // Create an array to store the commit information
  let commits:{ commitID, commitName, commitDate }[] = [];

  // Process each line to extract the commit ID and name
  lines.forEach((line) => {
    const [commitID, commitName, commitDate] = line.split('\t');
    commits.push({ commitID, commitName, commitDate });
  });

  // Output the list of commits
  console.log('Last commits:');
  commits = commits.reverse();

  for (const commit of commits) {
    const index = commits.indexOf(commit);

    const checkoutCommand = `git checkout ${commit.commitID}`;
    await tryLogAsync(executeAsync(checkoutCommand, { cwd: repositoryPath }));

    const data = readFile(repositoryPath + fileSubPath);
    writeFile(repositorynewPath + fileSubPath, data);

    const commitCommand = `git add . && git commit --date "${commit.commitDate}" -m "${commit.commitName}"`;
    await tryLogAsync(executeAsync(commitCommand, { cwd: repositorynewPath }));

    console.log(`${index + 1}. Commit ID: ${commit.commitID}`);
    console.log(`   Commit Name: ${commit.commitName}`);
    console.log(`   Commit Date: ${commit.commitDate}`);
  }
}
