import {executeSync} from 'razomy.shell';

export function gitCommit(c: string) {
  executeSync('git status', c);
}
