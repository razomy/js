import path from 'node:path';
import * as main from '@razomy/main';
import * as npm from '@razomy/npm';
import * as shell from '@razomy/shell';
import * as tsRefactorProject from '@razomy/ts-refactor-project';
import * as tsRefactor from '@razomy/ts-refactor';

export async function publish(path_: string) {
  console.info(path_);
  await shell.execute('npm run build', path.resolve(path_));
  // tsRefactorProject.packageJson.autoPatch(path.resolve(path_));
  tsRefactorProject.packageJson.createDist(path.resolve(path_));
  // await tsRefactor.createReadmeAndSpecifications(path.resolve(path_));

  // const publishCommand = `cd ${path.resolve(path_, 'dist')} && npm publish . --tag latest`;
  // console.info(`Выполняем: ${publishCommand}`);

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
    '../char',
    '../dict',
    '../language-string',
    '../schema',
    '../schemas',
    '../nuxt',
    '../run',
    '../language-vue',
    '../runtimes',
    '../vue',
    '../razomy',
    '../server',
    '../vue-resource',
    // '../express',
    // '../socket',
    // '../google-auth',
    // '../vrd',
    // '../function-booleans',
    // '../object',
    // '../kv',
    // '../socket-server',
    // '../undefined',
    // '../fns',
    // '../key',
    // '../videos',
    // '../audios',
    // '../main',
    // '../json',
    // '../functions',
  ];

  // Сначала проверяем, все ли нужные зависимости есть в этом списке
  await npm.checkNotProvidedDependency(packagesToDeploy);

  // Если скрипт не упал с ошибкой, запускаем публикацию
  for (const pkgPath of packagesToDeploy) {
    await publish(pkgPath);
  }
});
