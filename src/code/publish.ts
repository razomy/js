import path from 'node:path';
import * as main from '@razomy/main';
import * as npm from '@razomy/npm';
import * as shell from '@razomy/shell';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';
import '@razomy/razomy/extensions';

async function build(path_: string) {
  await shell.execute('npm run build', path.resolve(path_));
  // tsRefactorProject.packageJson.autoPatch(path.resolve(path_));
  if (!tsRefactor.isPackageNameSkipGeneratingPackageJsonAndReadme(path_.replace('../', '@razomy/'))) {
    tsRefactorProject.packageJson.createDist(path.resolve(path_));
    await tsRefactor.createReadmeAndSpecifications(path.resolve(path_));
  }
}

async function publishBuild(path_: string, isPublishNpm: boolean) {
  if (await npm.isPackageToUpdate(path_)) {
    const publishCommand = `cd ${path.resolve(path_, 'dist')} && npm stage publish . --tag latest`;
    const localVersion = npm.getPackageJsonVersion(path_);
    console.info(`Выполняем(${path_}@${localVersion}): ${publishCommand}`);

    if (isPublishNpm) {
      // Раскомментируйте, когда будете готовы к реальному деплою
      await shell.execute(publishCommand, path.resolve(path_, 'dist'));
    }
  }
}

export async function publish(path_: string) {
  console.info(path_);
  await build(path_);
  await publishBuild(path_, true);
}

main.ifMain(import.meta.url, async (args) => {
  // Выносим список пакетов в отдельный массив
  const packagesToBuildOnly = [
    '../abstractions',
    '../maths',
    '../char',
    '../dict',
    '../hir-string',
    '../hir-vue',
    '../runtimes',
    '../vue',
    '../razomy',
    '../server',
    '../socket',
    '../vue-resource',
    // other
    '../future',
    '../datetimes',
    '../primitives',
    '../kv',
    '../fs-recursive',
    '../kv-recursive',
    '../vrd',
    '../object',
    '../resources',
    '../lexemes',
    '../functions',
    '../json',
    '../vrd',
    '../kv',
    '../main',
    '../function-booleans',
    // products
    '../sql',
    '../cloud-db-pg',
  ];
  const packagesToBuildAndDeploy = [
    '../vue',
    '../nuxt',
    '../images',
    '../fs-file-format',
    '../videos',
    '../audios',
    '../schema',
    '../string-case',
    '../schemas',
    '../exceptions',
    '../random',
    '../run',
    '../string',
    '../array',
  ];

  const packagesToBuild = [
    ...packagesToBuildOnly,
    ...packagesToBuildAndDeploy
  ];
  // Сначала проверяем, все ли нужные зависимости есть в этом списке
  await npm.checkNotProvidedDependency(packagesToBuild);

  // Если скрипт не упал с ошибкой, запускаем публикацию
  for (const pkgPath of packagesToBuild) {
    console.info(pkgPath);
    await build(pkgPath);
  }

  for (const pkgPath of packagesToBuildAndDeploy) {
    console.info(pkgPath);
    await publishBuild(pkgPath, args[0] === 'production');
  }
});
