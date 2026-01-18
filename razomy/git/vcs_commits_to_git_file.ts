import {executeAsync} from 'razomy.shell';
import {progress} from 'razomy.shell';
import {ActorDatetimeDeltaString, addssToString} from 'razomy.commit.datetime.delta.string';
import {trySet} from 'razomy.fs.file';

export async function vcsCommitsToGitFile(prevSnapshot: string, dirPath: string, fileName: string, commits: ActorDatetimeDeltaString[]) {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (!commit.deltas.length) {
      continue;
    }
    prevSnapshot = addssToString(prevSnapshot, [commit]);
    trySet(fileName, prevSnapshot);
    progress(i, commits.length);
    await executeAsync(`git commit -a --no-verify --author "${commit.actor} <>" --date "${commit.datetime}" -m "${i}"`, {cwd: dirPath});
  }
  progress(commits.length, commits.length);
  await executeAsync('git gc', {cwd: dirPath});
}


