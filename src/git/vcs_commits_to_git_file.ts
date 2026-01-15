import {execute_async} from 'razomy.shell/execute_async';
import {progress} from 'razomy.shell/progress';
import  { addss_to_string,ActorDatetimeDeltaString} from 'razomy.commit/datetime/delta/string/adds';
import {try_write_file} from 'src/fs/file/try_write_file';

export async function vcs_commits_to_git_file(prev_snapshot: string, dir_path: string, file_name: string, commits: ActorDatetimeDeltaString[]) {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (!commit.deltas.length) {
      continue;
    }
    prev_snapshot = addss_to_string(prev_snapshot, [commit]);
    try_write_file(file_name, prev_snapshot);
    progress(i, commits.length);
    await execute_async(`git commit -a --no-verify --author "${commit.actor} <>" --date "${commit.datetime}" -m "${i}"`, {cwd: dir_path});
  }
  progress(commits.length, commits.length);
  await execute_async('git gc', {cwd: dir_path});
}


