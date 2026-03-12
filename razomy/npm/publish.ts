import path from 'node:path';
import * as shell from "@razomy/shell";
import * as main from "@razomy/main";
import * as tsRefactorProject from "@razomy/ts-refactor-project";
import * as tsRefactor from "@razomy/ts-refactor";

// import * as fs from '@razomy/fs-file';

export async function publish(path_: string) {
  try {
    await shell.execute('npm run build', path.resolve(path_));
    tsRefactorProject.packageJson.createDist(path.resolve(path_));
    await tsRefactor.createReadmeAndSpecifications(path.resolve(path_));
    // const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'));
    const publishCommand = `cd ${path.resolve(path_, 'dist')}` + ` && npm publish . --tag latest`;
    console.log(publishCommand);
    // await execute(publishCommand, path.resolve(path_, 'dist'));
  } catch (e) {
    console.error(e);
  }
}

main.ifMain(import.meta.url, () => {
  // publish('../string-case');
  // publish('../array');
  // publish('../exceptions');
  // publish('../string');
  // publish('../random');
  // publish('../dict');
  // publish('../dict-recursive');
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
