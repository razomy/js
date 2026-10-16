import * as aiGoogle from "@razomy/ai-google";

/**
 * Полный цикл обработки одного файла: чтение -> стрим ИИ -> потоковый парсинг -> запись на диск
 */
export async function processSingleFile(params: aiGoogle.refactor.ProcessSingleFileParams): Promise<aiGoogle.refactor.FileOperation[]> {
    const {
            fileEntry,
            fileIndex,
            totalFiles,
            config,
            fullSystemPrompt,
            cacheName,
            fallbackRepoContext,
            backupPaths,
            recentPathsSummary,
          } = params;
    const content = aiGoogle.refactor.readFileSafe(fileEntry.fullPath);
    if (content === null) return [];
    await aiGoogle.refactor.appendRawLog(backupPaths.rawLogPath, `\n\n### ITERATION ${fileIndex}: ${fileEntry.relativePath} ###\n`);
    const iterationPrompt = aiGoogle.refactor.buildFileIterationPrompt(
            fileIndex,
            totalFiles,
            fileEntry.relativePath,
            content,
            recentPathsSummary,
          );
    const streamParser = new aiGoogle.refactor.OperationStreamParser();
    const pendingDeletes: aiGoogle.refactor.FileOperation[] = [];
    const executedOps: aiGoogle.refactor.FileOperation[] = [];
    let createdOrUpdatedCount = 0;
    await aiGoogle.instant.streamWithContinuation({
    model: config.model,
    systemInstruction: fullSystemPrompt,
    cacheName,
    fallbackContext: fallbackRepoContext,
    initialPrompt: iterationPrompt,
    maxTurns: config.maxContinuationTurns,
    isDone: () => streamParser.isComplete(),
    getUnfinishedTail: () => streamParser.getTailContext(),
    onChunk: async (chunkText: string) => {
      await aiGoogle.refactor.appendRawLog(backupPaths.rawLogPath, chunkText);

      const readyOperations = streamParser.feedChunk(chunkText);

      for (const op of readyOperations) {
        executedOps.push(op);
        await aiGoogle.refactor.appendOperationJsonl(backupPaths.jsonlOpsPath, op);

        if (config.applyImmediately) {
          if (op.action === 'delete') {
            pendingDeletes.push(op);
          } else {
            const ok = await aiGoogle.refactor.executeOperationOnDisk(config.targetDir, op);
            if (ok) createdOrUpdatedCount++;
          }
        }
      }
    },
    });
    if (config.applyImmediately && pendingDeletes.length > 0) {
    const hadCreateIntent = executedOps.some((o) => o.action === 'create');
    for (const delOp of pendingDeletes) {
      if (hadCreateIntent && createdOrUpdatedCount === 0) {
        console.warn(`⚠️ Защита: Отмена удаления ${delOp.path}, т.к. новые файлы не были записаны.`);
        continue;
      }
      await aiGoogle.refactor.executeOperationOnDisk(config.targetDir, delOp);
    }
    }

    return executedOps;
}
