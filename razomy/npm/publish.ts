import path from 'node:path';
import * as main from '@razomy/main';
import * as shell from '@razomy/shell';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';
import * as npm from "@razomy/npm";

export async function publish(path_: string) {
  await shell.execute('npm run build', path.resolve(path_));
  // tsRefactorProject.packageJson.autoPatch(path.resolve(path_));
  tsRefactorProject.packageJson.createDist(path.resolve(path_));
  await tsRefactor.createReadmeAndSpecifications(path.resolve(path_));

  const publishCommand = `cd ${path.resolve(path_, 'dist')} && npm publish . --tag latest`;
  console.info(`Выполняем: ${publishCommand}`);

  // Раскомментируйте, когда будете готовы к реальному деплою
  // await shell.execute(publishCommand, path.resolve(path_, 'dist'));
}

main.ifMain(import.meta.url, async () => {
  // Выносим список пакетов в отдельный массив
  const packagesToDeploy = [
    '../abstracts',
    '../string-case',
    '../array',
    '../exceptions',
    '../random',
    '../fs-file-format',
    '../images',
    '../maths',
    '../string',
    '../dict',
    '../schema',
    '../schemas',
    '../nuxt',
    '../run',
    // '../dict-recursive',
    // '../videos',
    // '../audios',
    // '../main',
    // '../json',
    // '../async',
    // '../pipes',
  ];

  // Сначала проверяем, все ли нужные зависимости есть в этом списке
  await npm.checkNotProvidedDependency(packagesToDeploy);

  // Если скрипт не упал с ошибкой, запускаем публикацию
  for (const pkgPath of packagesToDeploy) {
    await publish(pkgPath);
  }
});
