import { execSync } from "node:child_process";

export function execCmd(cmd: string, cwd: string, env: NodeJS.ProcessEnv, stdio: 'inherit' | 'ignore' | 'pipe' = 'inherit'): string {
    return execSync(cmd, { cwd, env, stdio, encoding: 'utf8' })?.toString() || '';
}
