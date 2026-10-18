import * as shell from "@razomy/shell";

export async function tryExecuteSync<T>(path: string, cwd?: string) {
    try {
    return await shell.execute<T>(path, cwd);
    } catch (error) {
    return null;
    }
}
