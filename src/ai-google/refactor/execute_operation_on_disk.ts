import path from 'path';
import fs from 'fs/promises';
import * as fsFile from '@razomy/fs-file';
import * as aiGoogle from "@razomy/ai-google";

/**
 * Применяет одну файловую операцию на диск
 */
export async function executeOperationOnDisk(targetDir: string, op: aiGoogle.refactor.FileOperation): Promise<boolean> {
  if (op.action === 'noop') return true;

  if (!aiGoogle.refactor.isPathSafe(targetDir, op.path)) {
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
