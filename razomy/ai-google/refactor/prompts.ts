import * as path from 'path';
import { readFileSafe, walkDirectoryStream } from './fs_utils';
import { DEFAULT_IGNORE_LIST, type FileData } from './types';

/**
 * Обогащает переданный системный промпт правилами потокового парсинга операций
 */
export function buildFullSystemPrompt(userSystemPrompt: string, globalTaskPrompt: string): string {
  return `
${userSystemPrompt.trim()}

GLOBAL TASK INSTRUCTIONS:
${globalTaskPrompt.trim()}

CRITICAL OUTPUT FORMAT RULES:
1. Do NOT use JSON. Do NOT wrap entire files in Markdown codeblocks (\`\`\`).
2. Output ONLY a sequence of operations using the exact delimiter format shown below.
3. For each target file, you may emit ONE or HUNDREDS of operations:
   - 'update' existing files
   - 'create' one or multiple new domain files
   - 'delete' obsolete files
   - 'noop' if no changes are needed
4. For 'create' and 'update', write the COMPLETE raw file code right after ===CONTENT===.
5. Every single operation MUST end with ===END=== on a new line.
6. Only when ALL operations for the current target file are 100% finished, write ===FILE_DONE=== on a new line at the very end.

EXACT FORMAT TO FOLLOW:
===OPERATION===
ACTION: create | update | delete | noop
PATH: relative/path/to/file.ts
REASON: Brief explanation
===CONTENT===
<full raw code here>
===END===
===FILE_DONE===
`.trim();
}

/**
 * Формирует единый промпт со всеми файлами директории для пакетного рефакторинга
 */
export function buildDirectoryBatchPrompt(
  files: FileData[],
  taskPrompt: string,
  systemPrompt: string = 'You are an automated refactoring and file-management assistant.\nBelow is the current state of the files in a project directory.',
): string {
  const filesContext = files
    .map((f) => `===FILE: ${f.relativePath}===\n${f.content}\n===END FILE: ${f.relativePath}===`)
    .join('\n\n');

  return `
${systemPrompt.trim()}

Task Instructions:
${taskPrompt.trim()}

CRITICAL OUTPUT FORMAT RULES:
1. Do NOT use JSON. Do NOT wrap entire files in Markdown codeblocks (\`\`\`).
2. Output ONLY a sequence of operations using the exact delimiter format shown below.
3. For 'create' and 'update', write the COMPLETE raw file code right after ===CONTENT=== without any escaping.
4. For 'delete', leave the space between ===CONTENT=== and ===END=== empty.
5. Every single operation MUST end with ===END=== on a new line.
6. When ALL operations are completely done, write ===ALL_DONE=== at the very end.

EXACT FORMAT TO FOLLOW:
===OPERATION===
ACTION: create | update | delete
PATH: relative/path/to/file.ts
REASON: Brief explanation of why this action is taken
===CONTENT===
<full raw code here>
===END===

Current Project Files:
${filesContext}
`.trim();
}

/**
 * Собирает контекст репозитория для кэша, не переполняя память на больших проектах.
 * Читает ключевые файлы и строит карту путей проекта.
 */
export async function buildScalableRepositoryContext(
  targetDir: string,
  ignoreList: string[] = DEFAULT_IGNORE_LIST,
  maxFullFiles: number = 200,
  priorityFilePattern: RegExp = /^(readme|package\.json|tsconfig|index\.|architecture)/i,
): Promise<{ contextText: string; totalFilesCount: number }> {
  const filePaths: string[] = [];
  const priorityFilesContent: string[] = [];
  let fullFilesCount = 0;

  for await (const entry of walkDirectoryStream(targetDir, targetDir, ignoreList)) {
    filePaths.push(entry.relativePath);

    const isPriority = priorityFilePattern.test(path.basename(entry.relativePath));

    if ((isPriority || fullFilesCount < maxFullFiles) && fullFilesCount < maxFullFiles) {
      const content = readFileSafe(entry.fullPath);
      if (content !== null && content.length < 100_000) {
        priorityFilesContent.push(
          `===FILE: ${entry.relativePath}===\n${content}\n===END FILE: ${entry.relativePath}===`,
        );
        fullFilesCount++;
      }
    }
  }

  const treeSummary =
    filePaths.length > 5000
      ? filePaths.slice(0, 5000).join('\n') + `\n... (and ${filePaths.length - 5000} more files)`
      : filePaths.join('\n');

  const contextText = [
    `Repository Structure (${filePaths.length} total files):`,
    treeSummary,
    `\nReference Files Snapshot (${priorityFilesContent.length} files):`,
    priorityFilesContent.join('\n\n'),
  ].join('\n\n');

  return { contextText, totalFilesCount: filePaths.length };
}

/**
 * Формирует промпт для конкретного файла на текущем шаге итерации
 */
export function buildFileIterationPrompt(
  fileIndex: number,
  totalFiles: number,
  relativePath: string,
  fileContent: string,
  recentPathsSummary: string[] = [],
): string {
  const recentHistory =
    recentPathsSummary.length > 0
      ? `\nRecently modified/created paths (last ${recentPathsSummary.length}):\n${recentPathsSummary.join('\n')}`
      : '';

  return `
Current Target File (${fileIndex} of ${totalFiles}): "${relativePath}"

Current Content of "${relativePath}":
${fileContent}
${recentHistory}

Execute the Global Task Instructions for "${relativePath}".
Do not hold back on output size: create as many domain files, types, and functions as needed.
Output strictly using ===OPERATION=== ... ===END=== blocks and finish with ===FILE_DONE===.
`.trim();
}
