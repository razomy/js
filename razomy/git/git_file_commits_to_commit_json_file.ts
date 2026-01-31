import fs from 'fs';
import * as path from 'path';
import {compareVersions} from './compare_versions';

export async function gitFileCommitsToCommitJsonFile(
  repositoryPathRoot: string,
  fileSubPath: string,
) {

  const newFfile = path.join(repositoryPathRoot, fileSubPath + '.json');
  fs.writeFileSync(
    newFfile,
    '',
    'utf8',
  );

  // Usage example
  const history = await compareVersions(repositoryPathRoot, fileSubPath);
  const historyJson = JSON.stringify(history);

  fs.writeFileSync(
    newFfile,
    historyJson,
    'utf8',
  );

}
