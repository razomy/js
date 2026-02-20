import {executeSync} from '@razomy/shell';
import path from 'node:path';
import {packageJson} from '@razomy/ts-refactor-project';
import * as fs from '@razomy/fs-file';

export function publish(path_: string) {
  executeSync('npm run build', path.resolve(path_));
  packageJson.createDist(path.resolve(path_));
  const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'))
  executeSync(`cd dist && npm publish . --tag alpha && npm dist-tag add ${pkg.name}@${pkg.version} latest`, path.resolve(path_));
}

// publish('../fs-file-format')
// publish('../images')
// publish('../videos')
// publish('../audios')
// publish('../schema');
// publish('../schemas');
// publish('../nuxt');
