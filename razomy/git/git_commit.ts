import * as shell from "@razomy/shell";

export function gitCommit(c: string) {
  shell.executeSync('git status', c);
}
