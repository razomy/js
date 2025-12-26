import {Commit, snapshot} from "razomy.js/vcs/vcs";
import {executeAsync} from "razomy.js/shell/execute";
import {writeFile} from "razomy.js/fs/write";
import {progress} from "razomy.js/shell/log";

export async function init(dir_path: string, file_name: string) {
  await executeAsync('git init && git config gc.auto 0', {cwd: dir_path});
  let prev_snapshot = '';
  writeFile(file_name, prev_snapshot);
  await executeAsync(`git add .`, {cwd: dir_path});
}

export async function vcs_commits_to_git_file(prev_snapshot: string, dir_path: string, file_name: string, commits: Commit[]) {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (!commit.changes.length) {
      continue;
    }
    prev_snapshot = snapshot(prev_snapshot, [commit]);
    writeFile(file_name, prev_snapshot);
    progress(i, commits.length);
    await executeAsync(`git commit -a --no-verify --author "${commit.user} <>" --date "${commit.date}" -m "${commit.id}"`, {cwd: dir_path});
  }
  progress(commits.length, commits.length);
  await executeAsync('git gc', {cwd: dir_path});
}

export async function get_last_git_commit_id_or_null(ctx: { dir_path: string }) {
  try {
    return (await executeAsync(`git log --format="%H" -n 1`, {cwd: ctx.dir_path})).toString();
  } catch (e) {

  }
  return null;
}
