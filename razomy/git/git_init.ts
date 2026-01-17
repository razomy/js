import {executeSync} from 'razomy.shell/execute_sync';

export function gitInit(c: string) {
  executeSync('git init', c);
}
