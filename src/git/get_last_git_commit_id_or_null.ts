import execute_async from 'razomy.shell/execute_async';
export default async function get_last_git_commit_id_or_null(ctx: { dir_path: string }) {
    try {
    return (await execute_async(`git log --format="%H" -n 1`, {cwd: ctx.dir_path})).toString();
    } catch (e) {

    }

    return null;
}
