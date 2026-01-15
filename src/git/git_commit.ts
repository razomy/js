import {execute_sync} from 'razomy.shell/execute_sync';
export function git_commit(c: string) {
    execute_sync("git status", c);
}
