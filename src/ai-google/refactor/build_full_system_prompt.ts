
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
