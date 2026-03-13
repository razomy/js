import path from 'node:path';
import * as shell from '@razomy/shell';
import * as main from '@razomy/main';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';

// import * as fs from '@razomy/fs-file';

export async function publish(path_: string) {
  try {
    await shell.execute('npm run build', path.resolve(path_));
    tsRefactorProject.packageJson.createDist(path.resolve(path_));
    await tsRefactor.createReadmeAndSpecifications(path.resolve(path_));
    // const pkg = fs.getJson(path.resolve(path_, 'dist', 'package.json'));
    const publishCommand = `cd ${path.resolve(path_, 'dist')}` + ` && npm publish . --tag latest`;
    console.info(publishCommand);
    // await execute(publishCommand, path.resolve(path_, 'dist'));
  } catch (e) {
    console.error(e);
  }
}

main.ifMain(import.meta.url, async () => {
 await publish('../abstracts');
 await publish('../string-case');
 await publish('../array');
 await publish('../exceptions');
 await publish('../string');
 await publish('../random');
 await publish('../dict');
 await publish('../dict-recursive');
 await publish('../fs-file-format');
 await publish('../images');
 await publish('../videos');
 await publish('../audios');
 await publish('../schema');
 await publish('../schemas');
 await publish('../nuxt');
  // await publish('../main');
  // await publish('../json');
  // await publish('../tree');
  // await publish('../async');
  // await publish('../pipes');
});
