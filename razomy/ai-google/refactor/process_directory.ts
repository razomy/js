import * as fs from 'fs/promises';
import * as aiGoogle from '../index';
import { appendRawLog, initBackupSession } from './backup';
import { applyOperationsToDisk, getAllFiles } from './fs_utils';
import { parseOperations } from './operation_stream_parser';
import { buildDirectoryBatchPrompt } from './prompts';
import { DEFAULT_IGNORE_LIST, type DirectoryRefactorConfig, type FileOperation } from './types';

/**
 * Обрабатывает всю директорию целиком за один многошаговый диалог со стримингом,
 * мгновенным живым бэкапом на диск и автоматическим продолжением при обрыве токенов.
 */
export async function processDirectory(
  targetDirOrConfig: string | DirectoryRefactorConfig,
  taskPromptArg?: string,
): Promise<FileOperation[]> {
  const userConfig: DirectoryRefactorConfig =
    typeof targetDirOrConfig === 'string'
      ? { targetDir: targetDirOrConfig, taskPrompt: taskPromptArg || '' }
      : targetDirOrConfig;

  const {
    targetDir,
    taskPrompt,
    systemPrompt,
    model = aiGoogle.MODELS.expensive,
    ignoreList = DEFAULT_IGNORE_LIST,
    temperature = 0.8,
    maxOutputTokens = 65536,
    maxTurns = 10,
    backupDirName = '.gemini-backups',
    applyChanges = true,
  } = userConfig;

  const files = await getAllFiles(targetDir, targetDir, ignoreList);
  if (files.length === 0) {
    return [];
  }

  const backupPaths = await initBackupSession(targetDir, backupDirName);
  const basePrompt = buildDirectoryBatchPrompt(files, taskPrompt, systemPrompt);

  const allOperationsMap = new Map<string, FileOperation>();
  const contents: any[] = [{ role: 'user', parts: [{ text: basePrompt }] }];
  let turn = 1;

  while (turn <= maxTurns) {
    if (turn > 1) {
      await appendRawLog(backupPaths.rawLogPath, `\n\n--- AUTO CONTINUE TURN ${turn} ---\n\n`);
    }

    let chunkText = '';
    let finishReason = '';
    let streamCrashed = false;

    try {
      const responseStream = await aiGoogle.CLIENT.models.generateContentStream({
        model,
        contents,
        config: {
          responseMimeType: 'text/plain',
          temperature,
          maxOutputTokens,
        },
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          chunkText += chunk.text;
          await appendRawLog(backupPaths.rawLogPath, chunk.text);
        }
        if (chunk.candidates?.[0]?.finishReason) {
          finishReason = chunk.candidates[0].finishReason;
        }
      }
    } catch (apiError) {
      streamCrashed = true;
      console.error(`❌ Ошибка API во время стриминга (Turn ${turn}):`, apiError);
    }

    if (chunkText) {
      const { operations, hasUnfinishedBlock } = parseOperations(chunkText);

      for (const op of operations) {
        allOperationsMap.set(op.path, op);
      }

      if (backupPaths.jsonSnapshotPath) {
        await fs.writeFile(
          backupPaths.jsonSnapshotPath,
          JSON.stringify(Array.from(allOperationsMap.values()), null, 2),
          'utf-8',
        );
      }

      if (streamCrashed) {
        break;
      }

      const isAllDone = chunkText.includes('===ALL_DONE===') || chunkText.includes('===FILE_DONE===');

      if (isAllDone || (!hasUnfinishedBlock && finishReason !== 'MAX_TOKENS')) {
        break;
      }

      const completedPaths = Array.from(allOperationsMap.keys()).join(', ');
      contents.push({ role: 'model', parts: [{ text: chunkText }] });
      contents.push({
        role: 'user',
        parts: [
          {
            text: `You reached the output limit before finishing. 
Already completed files: [${completedPaths}].
Please CONTINUE generating the remaining operations starting with ===OPERATION=== (including restarting the last unfinished file if it was cut off before ===END===). 
Write ===ALL_DONE=== when completely finished.`,
          },
        ],
      });

      turn++;
    } else {
      break;
    }
  }

  const finalOperations = Array.from(allOperationsMap.values());

  if (applyChanges) {
    await applyOperationsToDisk(targetDir, finalOperations);
  }

  return finalOperations;
}