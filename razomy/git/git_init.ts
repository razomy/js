import * as shell from '@razomy/shell';

export function init(c: string) {
  shell.executeSync('git init', c);
}
