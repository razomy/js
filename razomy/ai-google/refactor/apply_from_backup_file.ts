import * as fs from "fs/promises";
import * as aiGoogle from "@razomy/ai-google";

/**
 * Восстановление и применение изменений из локального бэкап-файла с дедупликацией путей
 * и безопасным порядком применения (сначала create/update, затем delete).
 */
export async function applyFromBackupFile(targetDir: string, backupFilePath: string): Promise<aiGoogle.refactor.FileOperation[]> {
  const rawBackup = await fs.readFile(backupFilePath, 'utf-8');
  const { operations } = aiGoogle.refactor.parseOperations(rawBackup);

  const uniqueOpsMap = new Map<string, aiGoogle.refactor.FileOperation>();
  for (const op of operations) {
    uniqueOpsMap.set(op.path, op);
  }

  const finalOperations = Array.from(uniqueOpsMap.values());
  await aiGoogle.refactor.applyOperationsToDisk(targetDir, finalOperations);

  return finalOperations;
}

