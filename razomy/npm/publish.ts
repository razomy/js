import {execute} from '@razomy/shell';
import path from 'node:path';
import {packageJson} from '@razomy/ts-refactor-project';
import * as fs from '@razomy/fs-file';

export async function publish(path_: string) {
  await execute('npm run build', path.resolve(path_));
  packageJson.createDist(path.resolve(path_));
  const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'))
  console.log(`cd ${path.resolve(path_, 'dist')} && npm publish . --tag alpha --otp= && npm dist-tag add ${pkg.name}@${pkg.version} --otp= latest`)
}

// publish('../fs-file-format');
// publish('../images');
// publish('../videos');
// publish('../audios');
// publish('../schema');
// publish('../schemas');
// publish('../nuxt');