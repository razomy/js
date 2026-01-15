import {build, type Options} from 'tsup';
import path from 'path';
import fs from 'fs';

export function get_package_directories() {
  const root = process.cwd();

}

export async function build_packages_recursive() {
  const srcPath = path.join(process.cwd());
  const entries: string[] = [];

  const items = fs.readdirSync(srcPath);
  // 3. Пробегаемся по папкам и ищем index.ts (аналог 'src/*/index.ts')
  for (const item of items) {
    const dirPath = path.join(srcPath, item);
    const entryPath = path.join(dirPath, 'index.ts');

    // Проверяем, что это папка и внутри есть index.ts
    if (fs.statSync(dirPath).isDirectory() && fs.existsSync(entryPath)) {
      entries.push(entryPath);
    }
  }

  console.log(`Найдено модулей: ${entries.length}. Начинаем сборку...`);

  // Собираем всё параллельно
  await Promise.all(entries.map(async (entry) => {
    const dir = path.dirname(entry); // например src/my-lib

    const config: Options = {
      entry: [entry],                 // Вход
      outDir: path.join(dir, 'dist'), // Выход
      format: ['cjs', 'esm'],
      dts: true,
      splitting: false,
      sourcemap: false,
      silent: true,
    };

    await build(config);
    console.log(`🔨 Готово: ${dir}`);
  }));

  console.log(`✅ Все ${entries.length} пакетов собраны!`);
}

build_packages_recursive().catch((err) => {
  console.error('Ошибка при сборке:', err);
  process.exit(1);
});