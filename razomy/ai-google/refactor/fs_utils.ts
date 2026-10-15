import * as fs from 'fs/promises';
import * as path from 'path';
import * as fsFile from '@razomy/fs-file';
import { DEFAULT_IGNORE_LIST, type FileData, type FileEntry, type FileOperation } from './types';

/**
 * Проверяет, нужно ли игнорировать файл или папку
 */
export function shouldIgnoreEntry(entryName: string, ignoreList: string[] = DEFAULT_IGNORE_LIST): boolean {
  return ignoreList.some((ignoreItem) => entryName.includes(ignoreItem));
}

/**
 * Потоковый обход директории (AsyncGenerator).
 * Позволяет обходить сотни тысяч файлов без потребления оперативной памяти.
 */
export async function* walkDirectoryStream(
  dirPath: string,
  baseDir: string = dirPath,
  ignoreList: string[] = DEFAULT_IGNORE_LIST,
): AsyncGenerator<FileEntry> {
  let entries;
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (err) {
    console.warn(`⚠️ Не удалось прочитать директорию ${dirPath}:`, err);
    return;
  }

  for (const entry of entries) {
    if (shouldIgnoreEntry(entry.name, ignoreList)) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      yield* walkDirectoryStream(fullPath, baseDir, ignoreList);
    } else if (entry.isFile()) {
      yield { fullPath, relativePath };
    }
  }
}

/**
 * Безопасное чтение одного файла по требованию
 */
export function readFileSafe(fullPath: string): string | null {
  try {
    return fsFile.getSync(fullPath);
  } catch {
    console.warn(`⚠️ Пропуск файла ${fullPath} (бинарный или недоступен для чтения)`);
    return null;
  }
}

/**
 * Рекурсивно считывает все текстовые файлы в директории в массив FileData
 */
export async function getAllFiles(
  dirPath: string,
  baseDir: string = dirPath,
  ignoreList: string[] = DEFAULT_IGNORE_LIST,
): Promise<FileData[]> {
  const results: FileData[] = [];

  for await (const entry of walkDirectoryStream(dirPath, baseDir, ignoreList)) {
    const content = readFileSafe(entry.fullPath);
    if (content !== null) {
      results.push({
        relativePath: entry.relativePath,
        content,
      });
    }
  }

  return results;
}

/**
 * Проверка безопасности пути (защита от Path Traversal)
 */
export function isPathSafe(targetDir: string, relativeTarget: string): boolean {
  const resolvedBase = path.resolve(targetDir);
  const resolvedTarget = path.resolve(targetDir, relativeTarget);
  return resolvedTarget.startsWith(resolvedBase + path.sep) || resolvedTarget === resolvedBase;
}

/**
 * Применяет одну файловую операцию на диск
 */
export async function executeOperationOnDisk(targetDir: string, op: FileOperation): Promise<boolean> {
  if (op.action === 'noop') return true;

  if (!isPathSafe(targetDir, op.path)) {
    console.error(`🚨 Security Error: Попытка выхода за пределы директории: ${op.path}`);
    return false;
  }

  const fullTargetPath = path.resolve(targetDir, op.path);

  try {
    if (op.action === 'create' || op.action === 'update') {
      if (!op.content || op.content.trim() === '') {
        console.warn(`⚠️ Пропуск: пустой контент для ${op.path}`);
        return false;
      }
      await fs.mkdir(path.dirname(fullTargetPath), { recursive: true });
      fsFile.setSync(fullTargetPath, op.content);
      return true;
    }

    if (op.action === 'delete') {
      try {
        await fs.unlink(fullTargetPath);
      } catch (err: any) {
        if (err.code !== 'ENOENT') throw err;
      }
      return true;
    }
  } catch (error) {
    console.error(`❌ Ошибка диска (${op.action} ${op.path}):`, error);
  }
  return false;
}

/**
 * Безопасно применяет пакет распознанных операций к файловой системе.
 * Сначала выполняет создание и обновление, и только в конце — удаление.
 */
export async function applyOperationsToDisk(targetDir: string, finalOperations: FileOperation[]): Promise<number> {
  const validOps = finalOperations.filter((op) => op.action !== 'noop');
  if (validOps.length === 0) {
    console.warn('⚠️ Нет валидных операций для применения к файловой системе.');
    return 0;
  }

  const sortedOperations = [
    ...validOps.filter((op) => op.action !== 'delete'),
    ...validOps.filter((op) => op.action === 'delete'),
  ];

  let writtenCount = 0;
  let appliedCount = 0;
  const hasCreateIntent = validOps.some((o) => o.action === 'create');

  for (const op of sortedOperations) {
    if (op.action === 'delete' && hasCreateIntent && writtenCount === 0) {
      console.warn(
        `⚠️ Safety Stop: Пропуск удаления ${op.path}, так как ни один новый файл не был успешно записан.`,
      );
      continue;
    }

    const ok = await executeOperationOnDisk(targetDir, op);
    if (ok) {
      appliedCount++;
      if (op.action === 'create' || op.action === 'update') {
        writtenCount++;
      }
    }
  }

  return appliedCount;
}