import * as aiGoogle from "@razomy/ai-google";

/**
 * Безопасно применяет пакет распознанных операций к файловой системе.
 * Сначала выполняет создание и обновление, и только в конце — удаление.
 */
export async function applyOperationsToDisk(targetDir: string, finalOperations: aiGoogle.refactor.FileOperation[]): Promise<number> {
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

    const ok = await aiGoogle.refactor.executeOperationOnDisk(targetDir, op);
    if (ok) {
      appliedCount++;
      if (op.action === 'create' || op.action === 'update') {
        writtenCount++;
      }
    }
  }

  return appliedCount;
}
