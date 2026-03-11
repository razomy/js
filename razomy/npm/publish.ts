import {execute} from '@razomy/shell';
import {ifMain} from '@razomy/main';
import path from 'node:path';
import {packageJson} from '@razomy/ts-refactor-project';
import * as fs from '@razomy/fs-file';
import {createReadmeAndSpecifications} from '@razomy/ts-refactor';

export async function publish(path_: string) {
  try {
    await execute('npm run build', path.resolve(path_));
    packageJson.createDist(path.resolve(path_));
    await createReadmeAndSpecifications(path.resolve(path_));
    const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'));
    const publishCommand = `cd ${path.resolve(path_, 'dist')}`
      + ` && npm publish . --tag latest`
      + ` && npm dist-tag add ${pkg.name}@${pkg.version} latest`
    console.log(publishCommand);
    await execute(publishCommand, path.resolve(path_, 'dist'));
  } catch (e) {
    console.error(e);
  }
}

ifMain(import.meta.url, () => {
  publish('../string-case');
  publish('../array');
  publish('../string');
  publish('../dict');
  publish('../random');
  publish('../dict-recursive');
  // publish('../json');
  // publish('../tree');
  // publish('../async');
  // publish('../fs-file-format');
  // publish('../images');
  // publish('../videos');
  // publish('../audios');
  // publish('../schema');
  // publish('../schemas');
  // publish('../pipes');
  // publish('../nuxt');
});
