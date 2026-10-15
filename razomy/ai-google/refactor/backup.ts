import { createReadStream } from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { applyOperationsToDisk, executeOperationOnDisk } from './fs_utils';
import { OperationStreamParser, parseOperations } from './operation_stream_parser';
import { type BackupPaths, type FileOperation } from './types';

/**
 * Инициализация папки и файлов бэкапа
 */
export async function initBackupSession(
  targetDir: string,
  backupDirName: string = '.gemini-backups',
): Promise<BackupPaths> {
  const dir = path.join(targetDir, backupDirName);
  await fs.mkdir(dir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  return {
    dir,
    rawLogPath: path.join(dir, `stream-raw-${timestamp}.log`),
    jsonlOpsPath: path.join(dir, `operations-${timestamp}.jsonl`),
    jsonSnapshotPath: path.join(dir, `operations-${timestamp}.json`),
  };
}

/**
 * Дописывает кусок сырого текста в лог-файл
 */
export async function appendRawLog(rawLogPath: string, text: string): Promise<void> {
  await fs.appendFile(rawLogPath, text, 'utf-8');
}

/**
 * Дописывает одну операцию в формате JSONL (O(1) по памяти и диску)
 */
export async function appendOperationJsonl(jsonlPath: string, op: FileOperation): Promise<void> {
  const record = JSON.stringify({
    action: op.action,
    path: op.path,
    reason: op.reason,
    contentLength: op.content.length,
  });
  await fs.appendFile(jsonlPath, record + '\n', 'utf-8');
}

/**
 * Восстановление и применение изменений из локального бэкап-файла с дедупликацией путей
 * и безопасным порядком применения (сначала create/update, затем delete).
 */
export async function applyFromBackupFile(targetDir: string, backupFilePath: string): Promise<FileOperation[]> {
  const rawBackup = await fs.readFile(backupFilePath, 'utf-8');
  const { operations } = parseOperations(rawBackup);

  const uniqueOpsMap = new Map<string, FileOperation>();
  for (const op of operations) {
    uniqueOpsMap.set(op.path, op);
  }

  const finalOperations = Array.from(uniqueOpsMap.values());
  await applyOperationsToDisk(targetDir, finalOperations);

  return finalOperations;
}

/**
 * Потоковое чтение лог-файла бэкапа (любого размера) и применение операций на диск
 */
export async function applyFromBackupStream(targetDir: string, rawLogFilePath: string): Promise<number> {
  const parser = new OperationStreamParser();
  const fileStream = createReadStream(rawLogFilePath, { encoding: 'utf-8', highWaterMark: 64 * 1024 });

  let totalApplied = 0;

  for await (const chunk of fileStream) {
    const ops = parser.feedChunk(chunk as string);
    for (const op of ops) {
      await executeOperationOnDisk(targetDir, op);
      totalApplied++;
    }
  }

  return totalApplied;
}