import * as shell from "@razomy/shell";

export function gitInit(c: string) {
  shell.executeSync('git init', c);
}
