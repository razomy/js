import * as aiGoogle from "@razomy/ai-google";

export interface ProcessSingleFileParams {
  fileEntry: aiGoogle.refactor.FileEntry;
  fileIndex: number;
  totalFiles: number;
  config: Required<aiGoogle.refactor.RefactorConfig>;
  fullSystemPrompt: string;
  cacheName: string | undefined;
  fallbackRepoContext: string;
  backupPaths: aiGoogle.refactor.BackupPaths;
  recentPathsSummary: string[];
}

/**
 * Главная функция запуска процесса пофайлового рефакторинга репозитория
 */
export async function processRepository(userConfig: aiGoogle.refactor.RefactorConfig): Promise<void> {
  const config: Required<aiGoogle.refactor.RefactorConfig> = {
    model: aiGoogle.MODELS.cheap,
    ignoreList: aiGoogle.refactor.DEFAULT_IGNORE_LIST,
    applyImmediately: true,
    cleanupCacheAfterRun: true,
    maxContinuationTurns: 10,
    maxFullFilesInCache: 150,
    backupDirName: '.gemini-backups',
    ...userConfig,
  };

  const backupPaths = await aiGoogle.refactor.initBackupSession(config.targetDir, config.backupDirName);
  const fullSystemPrompt = aiGoogle.refactor.buildFullSystemPrompt(config.systemPrompt, config.taskPrompt);

  const { contextText, totalFilesCount } = await aiGoogle.refactor.buildScalableRepositoryContext(
    config.targetDir,
    config.ignoreList,
    config.maxFullFilesInCache,
  );

  if (totalFilesCount === 0) {
    return;
  }

  const cacheName = await aiGoogle.cache.createSafe({
    model: config.model,
    systemInstruction: fullSystemPrompt,
    cachedText: contextText,
  });

  const recentPathsWindow: string[] = [];
  let currentIndex = 0;

  try {
    for await (const fileEntry of aiGoogle.refactor.walkDirectoryStream(config.targetDir, config.targetDir, config.ignoreList)) {
      currentIndex++;

      try {
        const ops = await aiGoogle.refactor.processSingleFile({
          fileEntry,
          fileIndex: currentIndex,
          totalFiles: totalFilesCount,
          config,
          fullSystemPrompt,
          cacheName,
          fallbackRepoContext: contextText,
          backupPaths,
          recentPathsSummary: recentPathsWindow,
        });

        for (const op of ops) {
          recentPathsWindow.push(`- ${op.action.toUpperCase()}: ${op.path}`);
          if (recentPathsWindow.length > 100) {
            recentPathsWindow.shift();
          }
        }
      } catch (fileError) {
        console.error(`❌ Ошибка при обработке файла ${fileEntry.relativePath}:`, fileError);
      }
    }
  } finally {
    if (config.cleanupCacheAfterRun) {
      await aiGoogle.cache.deleteSafe(cacheName);
    }
  }
}
