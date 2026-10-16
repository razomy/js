import * as aiGoogle from "@razomy/ai-google";

/**
 * Построчный парсер полного текста ответа без JSON.
 * Устойчив к кавычкам, спецсимволам и обрывам стрима.
 */
export function parseOperations(rawResponse: string): {
      operations: aiGoogle.refactor.FileOperation[];
      hasUnfinishedBlock: boolean;
    } {
    const operations: aiGoogle.refactor.FileOperation[] = [];
    let hasUnfinishedBlock = false;
    const blocks = rawResponse.split(/^===OPERATION===\s*$/m);
    for (const block of blocks) {
    if (!block.trim() || block.trim() === '===ALL_DONE===' || block.trim() === '===FILE_DONE===') {
      continue;
    }

    const endSplit = block.split(/^===END===\s*$/m);
    if (endSplit.length < 2) {
      hasUnfinishedBlock = true;
      continue;
    }

    const validBlock = endSplit[0];
    const parsed = aiGoogle.refactor.parseSingleOperationBlock(validBlock);

    if (!parsed) {
      console.warn('⚠️ Пропущен блок с некорректным форматом заголовков:\n', validBlock.slice(0, 200));
      continue;
    }

    if (parsed.action !== 'noop') {
      operations.push(parsed);
    }
    }

    return { operations, hasUnfinishedBlock };
}
