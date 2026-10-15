import { type FileOperation } from './types';

/**
 * Парсит один завершенный текстовый блок между ===OPERATION=== и ===END===
 */
export function parseSingleOperationBlock(rawBlock: string): FileOperation | null {
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
    action: actionMatch[1].toLowerCase() as FileOperation['action'],
    path: pathMatch[1].trim(),
    reason: reasonMatch ? reasonMatch[1].trim() : 'No reason provided',
    content,
  };
}

/**
 * Построчный парсер полного текста ответа без JSON.
 * Устойчив к кавычкам, спецсимволам и обрывам стрима.
 */
export function parseOperations(rawResponse: string): {
  operations: FileOperation[];
  hasUnfinishedBlock: boolean;
} {
  const operations: FileOperation[] = [];
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
    const parsed = parseSingleOperationBlock(validBlock);

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

/**
 * Потоковый парсер: принимает чанки текста по мере генерации ИИ,
 * извлекает готовые операции `===OPERATION=== ... ===END===` и сразу освобождает память.
 */
export class OperationStreamParser {
  private buffer = '';
  private fileDoneDetected = false;
  private readonly doneMarker: string;

  constructor(doneMarker: string = '===FILE_DONE===') {
    this.doneMarker = doneMarker;
  }

  public feedChunk(chunk: string): FileOperation[] {
    this.buffer += chunk;

    if (this.buffer.includes(this.doneMarker)) {
      this.fileDoneDetected = true;
    }

    const extracted: FileOperation[] = [];

    while (true) {
      const startIdx = this.buffer.indexOf('===OPERATION===');
      if (startIdx === -1) {
        if (this.buffer.length > 200) {
          this.buffer = this.buffer.slice(-50);
        }
        break;
      }

      const endIdx = this.buffer.indexOf('===END===', startIdx);
      if (endIdx === -1) {
        if (startIdx > 0) {
          this.buffer = this.buffer.slice(startIdx);
        }
        break;
      }

      const rawBlock = this.buffer.slice(startIdx + '===OPERATION==='.length, endIdx);
      const parsedOp = parseSingleOperationBlock(rawBlock);

      if (parsedOp && parsedOp.action !== 'noop') {
        extracted.push(parsedOp);
      }

      this.buffer = this.buffer.slice(endIdx + '===END==='.length);
    }

    return extracted;
  }

  public isComplete(): boolean {
    return this.fileDoneDetected;
  }

  /** Возвращает хвост буфера для бесшовного продолжения генерации (Auto-Continuation) */
  public getTailContext(maxChars: number = 1500): string {
    return this.buffer.slice(-maxChars);
  }
}