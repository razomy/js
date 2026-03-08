import { execute } from '@razomy/shell';
import { ifMain } from '@razomy/main';
import path from 'node:path';
import { packageJson } from '@razomy/ts-refactor-project';
import * as fs from '@razomy/fs-file';

export async function publish(path_: string) {
  await execute('npm run build', path.resolve(path_));
  packageJson.createDist(path.resolve(path_));
  // await extracyForIo(path.resolve(path_));
  const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'));
  const npmPublshKey = '';
  console.log(
    `cd ${path.resolve(path_, 'dist')} && npm publish . --tag beta --otp=${npmPublshKey} && npm dist-tag add ${
      pkg.name
    }@${pkg.version} latest --otp=${npmPublshKey}`,
  );
}

ifMain(import.meta.url, () => {
  // publish('../string-case');
  // publish('../array');
  // publish('../string');
  // publish('../dict');
  // publish('../recursive');
  // publish('../json');
  // publish('../tree');
  // publish('../async');
  // publish('../random');


  // publish('../fs-file-format');
  // publish('../images');
  // publish('../videos');
  // publish('../audios');

  // publish('../schema');
  // publish('../schemas');

  // publish('../pipes');
  // publish('../nuxt');
});
