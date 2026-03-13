import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * 1. Создает сет из всех деплоящихся пакетов
 * 2. Проверяет зависимости каждого пакета
 * 3. Если внутренняя зависимость не в списке деплоя — кидает ошибку
 */
export async function checkNotProvidedDependency(paths: string[]) {
  const deployedPackages = new Set<string>();
  const packagesData: { dir: string; pkg: any }[] = [];

  // Шаг 1: Читаем все package.json и собираем имена пакетов в Set
  for (const dir of paths) {
    const pkgPath = path.resolve(dir, 'package.json');
    try {
      const content = await fs.readFile(pkgPath, 'utf-8');
      const pkg = JSON.parse(content);

      if (!pkg.name) {
        throw new Error(`В файле ${pkgPath} отсутствует поле "name"`);
      }

      deployedPackages.add(pkg.name);
      packagesData.push({dir, pkg});
    } catch (error) {
      throw new Error(`Не удалось прочитать package.json в ${dir}: ${error.message}`);
    }
  }

  // Шаг 2: Проверяем зависимости каждого пакета
  for (const {dir, pkg} of packagesData) {
    // Собираем все типы зависимостей пакета
    const allDependencies = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
      ...(pkg.peerDependencies || {})
    };

    for (const depName of Object.keys(allDependencies)) {
      // Проверяем только внутренние пакеты монорепозитория (скоуп @razomy)
      // Если вам нужно проверять ВООБЩЕ ВСЕ пакеты, уберите условие if (depName.startsWith('@razomy/'))
      if (depName.startsWith('@razomy/')) {
        if (!deployedPackages.has(depName)) {
          throw new Error(
            `❌ Ошибка зависимостей: Пакет "${pkg.name}" (${dir}) зависит от "${depName}", ` +
            `но пакет "${depName}" не указан в списке на деплой!`
          );
        }
      }
    }
  }

  console.info('✅ Все внутренние зависимости присутствуют в списке деплоя.');
}