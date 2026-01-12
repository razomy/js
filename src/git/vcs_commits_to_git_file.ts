
import execute_async from "razomy/shell/execute_async";
import {progress} from "razomy/shell/log";
import {ActorDatetimeDeltaString, addss_to_string} from 'razomy/commit/datetime/delta/string/adds';
import {write_file} from 'razomy/fs/file/write';

export async function init(dir_path: string, file_name: string) {
  await execute_async('git init && git config gc.auto 0', {cwd: dir_path});
  let prev_snapshot = '';
  write_file(file_name, prev_snapshot);
  await execute_async(`git add .`, {cwd: dir_path});
}

async function vcs_commits_to_git_file(prev_snapshot: string, dir_path: string, file_name: string, commits: ActorDatetimeDeltaString[]) {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (!commit.deltas.length) {
      continue;
    }
    prev_snapshot = addss_to_string(prev_snapshot, [commit]);
    write_file(file_name, prev_snapshot);
    progress(i, commits.length);
    await execute_async(`git commit -a --no-verify --author "${commit.actor} <>" --date "${commit.datetime}" -m "${i}"`, {cwd: dir_path});
  }
  progress(commits.length, commits.length);
  await execute_async('git gc', {cwd: dir_path});
}

export async function get_last_git_commit_id_or_null(ctx: { dir_path: string }) {
  try {
    return (await execute_async(`git log --format="%H" -n 1`, {cwd: ctx.dir_path})).toString();
  } catch (e) {

  }
  return null;
}

export default vcs_commits_to_git_file;
