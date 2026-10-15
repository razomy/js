import * as aiGoogle from '../index';
import { appendOperationJsonl, appendRawLog, initBackupSession } from './backup';
import { executeOperationOnDisk, readFileSafe, walkDirectoryStream } from './fs_utils';
import { OperationStreamParser } from './operation_stream_parser';
import { buildFileIterationPrompt, buildFullSystemPrompt, buildScalableRepositoryContext } from './prompts';
import {
  DEFAULT_IGNORE_LIST,
  type BackupPaths,
  type FileEntry,
  type FileOperation,
  type RefactorConfig,
} from './types';

export interface ProcessSingleFileParams {
  fileEntry: FileEntry;
  fileIndex: number;
  totalFiles: number;
  config: Required<RefactorConfig>;
  fullSystemPrompt: string;
  cacheName?: string;
  fallbackRepoContext: string;
  backupPaths: BackupPaths;
  recentPathsSummary: string[];
}

/**
 * Полный цикл обработки одного файла: чтение -> стрим ИИ -> потоковый парсинг -> запись на диск
 */
export async function processSingleFile(params: ProcessSingleFileParams): Promise<FileOperation[]> {
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

  const content = readFileSafe(fileEntry.fullPath);
  if (content === null) return [];

  await appendRawLog(backupPaths.rawLogPath, `\n\n### ITERATION ${fileIndex}: ${fileEntry.relativePath} ###\n`);

  const iterationPrompt = buildFileIterationPrompt(
    fileIndex,
    totalFiles,
    fileEntry.relativePath,
    content,
    recentPathsSummary,
  );

  const streamParser = new OperationStreamParser();
  const pendingDeletes: FileOperation[] = [];
  const executedOps: FileOperation[] = [];
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
      await appendRawLog(backupPaths.rawLogPath, chunkText);

      const readyOperations = streamParser.feedChunk(chunkText);

      for (const op of readyOperations) {
        executedOps.push(op);
        await appendOperationJsonl(backupPaths.jsonlOpsPath, op);

        if (config.applyImmediately) {
          if (op.action === 'delete') {
            pendingDeletes.push(op);
          } else {
            const ok = await executeOperationOnDisk(config.targetDir, op);
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
      await executeOperationOnDisk(config.targetDir, delOp);
    }
  }

  return executedOps;
}

/**
 * Главная функция запуска процесса пофайлового рефакторинга репозитория
 */
export async function processRepository(userConfig: RefactorConfig): Promise<void> {
  const config: Required<RefactorConfig> = {
    model: aiGoogle.MODELS.cheap,
    ignoreList: DEFAULT_IGNORE_LIST,
    applyImmediately: true,
    cleanupCacheAfterRun: true,
    maxContinuationTurns: 10,
    maxFullFilesInCache: 150,
    backupDirName: '.gemini-backups',
    ...userConfig,
  };

  const backupPaths = await initBackupSession(config.targetDir, config.backupDirName);
  const fullSystemPrompt = buildFullSystemPrompt(config.systemPrompt, config.taskPrompt);

  const { contextText, totalFilesCount } = await buildScalableRepositoryContext(
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
    for await (const fileEntry of walkDirectoryStream(config.targetDir, config.targetDir, config.ignoreList)) {
      currentIndex++;

      try {
        const ops = await processSingleFile({
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