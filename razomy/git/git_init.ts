import {executeSync} from 'razomy.shell';

export function gitInit(c: string) {
  executeSync('git init', c);
}
