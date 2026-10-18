import * as aiGoogle from "@razomy/ai-google";

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

  public feedChunk(chunk: string): aiGoogle.refactor.FileOperation[] {
    this.buffer += chunk;

    if (this.buffer.includes(this.doneMarker)) {
      this.fileDoneDetected = true;
    }

    const extracted: aiGoogle.refactor.FileOperation[] = [];

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
      const parsedOp = aiGoogle.refactor.parseSingleOperationBlock(rawBlock);

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
