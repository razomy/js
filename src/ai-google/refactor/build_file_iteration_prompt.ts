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
