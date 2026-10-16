import * as aiGoogle from "@razomy/ai-google";

/**
 * Формирует единый промпт со всеми файлами директории для пакетного рефакторинга
 */
export function buildDirectoryBatchPrompt(
  files: aiGoogle.refactor.FileData[],
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
