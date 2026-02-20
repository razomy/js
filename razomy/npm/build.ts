import {executeSync} from '@razomy/shell';
import path from 'node:path';

export function build(path_: string) {
  executeSync('npm run build', path.resolve('../', path_))
}

// build('schema');
// build('schemas');
// build('nuxt');
