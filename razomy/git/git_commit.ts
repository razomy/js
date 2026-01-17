import {executeSync} from 'razomy.shell/execute_sync';

export function gitCommit(c: string) {
  executeSync('git status', c);
}
