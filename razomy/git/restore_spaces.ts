import fs from 'fs';
import path from 'path';
import {execSync} from 'child_process';


export function restoreSpaces(args: string[]) {
  const gitRepoPath = args[0];
  const oldCommit = args[1] || 'HEAD'; // По умолчанию смотрим изменения относительно последнего коммита

  try {
    console.log(`📂 Анализируем репозиторий: ${gitRepoPath}`);
    console.log(`🔍 Ищем измененные файлы относительно: ${oldCommit}...\n`);

    // Получаем список измененных файлов через git diff
    const diffOutput = execSync(`git diff --name-only ${oldCommit}`, {
      cwd: gitRepoPath,
      encoding: 'utf-8'
    });

    // Разбиваем вывод на строки, убираем пустые и оставляем только yaml/yml
    const changedFiles = diffOutput
      .split(/\r?\n/)
      .map(file => file.trim())
      .filter(file => file.length > 0)
      .filter(file => file.endsWith('.rn') || file.endsWith('.yaml'));

    if (changedFiles.length === 0) {
      console.log('🤷‍♂️ Измененных YAML файлов не найдено. Нечего чинить.');
      process.exit(0);
    }

    console.log(`🛠 Найдено YAML файлов для обработки: ${changedFiles.length}`);

    let successCount = 0;
    let errorCount = 0;

    // Проходимся по каждому измененному файлу
    for (const relativeFilePath of changedFiles) {
      console.log(`\n▶ Обработка: ${relativeFilePath}`);
      const absoluteFilePath = path.join(gitRepoPath, relativeFilePath);

      try {
        // Проверка: вдруг файл удалили, а он висит в diff
        if (!fs.existsSync(absoluteFilePath)) {
          throw new Error('Файл удален на диске, пропускаем.');
        }

        // Достаем старый файл из Git
        const oldContent = execSync(`git show ${oldCommit}:${relativeFilePath}`, {
          cwd: gitRepoPath,
          encoding: 'utf-8',
          stdio: ['pipe', 'pipe', 'ignore'] // Скрываем ошибки гита в консоли, ловим их в catch
        });

        // Читаем текущий файл
        const newContent = fs.readFileSync(absoluteFilePath, 'utf-8');

        const oldLines = oldContent.split(/\r?\n/);
        const newLines = newContent.split(/\r?\n/);
        if (oldLines.at(-1) !== '') {
          oldLines.push('');
        }

        if (newLines.at(-1) !== '') {
          newLines.push('');
        }

        // Проверка на совпадение количества строк
        if (oldLines.length !== newLines.length) {
          throw new Error(`Количество строк не совпадает (Git: ${oldLines.length}, Диск: ${newLines.length}). Пропускаем.`);
        }

        const fixedLines:string[] = [];

        // Восстанавливаем отступы
        for (let i = 0; i < oldLines.length; i++) {
          const spaceMatch = oldLines[i].match(/^(\s*)/);
          const leadingSpaces = spaceMatch ? spaceMatch[1] : '';
          fixedLines.push(leadingSpaces + newLines[i].trimStart());
        }

        // Сохраняем файл
        fs.writeFileSync(absoluteFilePath, fixedLines.join('\n'), 'utf-8');
        console.log(`  ✅ Успешно восстановлен.`);
        successCount++;

      } catch (fileError:any) {
        console.log(`  ❌ Ошибка: ${fileError.message}`);
        // Если ошибка в git show (например, файл новый и его нет в старом коммите)
        if (fileError.message.includes('Command failed: git show')) {
          console.log(`  ❌ Ошибка: Файл не существовал в коммите ${oldCommit}.`);
        }
        errorCount++;
      }
    }

    console.log('\n==================================');
    console.log(`🏁 Готово! Успешно: ${successCount}, Ошибок: ${errorCount}`);

  } catch (globalError:any) {
    console.error('\n❌ Критическая ошибка:');
    if (globalError.stderr) {
      console.error(globalError.stderr.toString());
    } else {
      console.error(globalError.message);
    }
  }
}

