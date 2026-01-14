import execute_sync from "razomy.shell/execute_sync";

export function git_init(c: string) {
    execute_sync("git init", c);
}
