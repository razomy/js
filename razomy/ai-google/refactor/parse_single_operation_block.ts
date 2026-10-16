import * as aiGoogle from "@razomy/ai-google";

/**
 * Парсит один завершенный текстовый блок между ===OPERATION=== и ===END===
 */
export function parseSingleOperationBlock(rawBlock: string): aiGoogle.refactor.FileOperation | null {
    const parts = rawBlock.split(/^===CONTENT===\r?\n?/m);
    const header = parts[0] || '';
    const content = parts.slice(1).join('===CONTENT===\n').replace(/\r?\n$/, '');
    const actionMatch = header.match(/^ACTION:\s*(create|update|delete|noop)\s*$/im);
    const pathMatch = header.match(/^PATH:\s*(.+?)\s*$/im);
    const reasonMatch = header.match(/^REASON:\s*(.+?)\s*$/im);
    if (!actionMatch || !pathMatch) {
    return null;
    }

    return {
    action: actionMatch[1].toLowerCase() as aiGoogle.refactor.FileOperation['action'],
    path: pathMatch[1].trim(),
    reason: reasonMatch ? reasonMatch[1].trim() : 'No reason provided',
    content,
    };
}
