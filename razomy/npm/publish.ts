import { execute } from '@razomy/shell';
import path from 'node:path';
import { packageJson } from '@razomy/ts-refactor-project';
import { extracyForIo } from '@razomy/ts-refactor';
import * as fs from '@razomy/fs-file';

export async function publish(path_: string) {
  await execute('npm run build', path.resolve(path_));
  packageJson.createDist(path.resolve(path_));
  // await extracyForIo(path.resolve(path_));
  const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'));
  const npmPublshKey = '';
  console.log(`cd ${path.resolve(path_, 'dist')} && npm publish . --tag beta --otp=${npmPublshKey} && npm dist-tag add ${pkg.name}@${pkg.version} latest --otp=${npmPublshKey}`);
}

// publish('../fs-file-format');
// publish('../images');
// publish('../videos');
// publish('../audios');
// publish('../schema');
// publish('../schemas');
// publish('../array');
// publish('../string');
// publish('../string-case');
// publish('../async');
// publish('../pipes');
publish('../nuxt');
