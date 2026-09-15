import { OpCode } from "../type";

export interface Wal {
  WAL_ENTRY_SIZE: number;
  walBuffer: ArrayBuffer;
  walU32: Uint32Array;
  walF32: Float32Array;
  walHead: number;
  push(op: OpCode, entity: number, field: number, arg1?: number, arg2?: number, arg3?: number): void;
  clear(): void;
}

const MAX_DOUBLE_ELEMENTS = 4 * 1024 * 1024;  // ~16 МБ (порог умного ресайза)
const HARD_LIMIT_ELEMENTS = 64 * 1024 * 1024; // ~256 МБ (жесткий лимит)

export function createWal(initialCapacity: number): Wal {
  const WAL_ENTRY_SIZE = 6;
  const elementCount = initialCapacity * WAL_ENTRY_SIZE;
  const walBuffer = new ArrayBuffer(elementCount * 4);

  return {
    WAL_ENTRY_SIZE,
    walBuffer,
    walU32: new Uint32Array(walBuffer),
    walF32: new Float32Array(walBuffer),
    walHead: 0,
    push(op, entity, field, a1 = 0, a2 = 0, a3 = 0) { pushWal(this, op, entity, field, a1, a2, a3); },
    clear() { clearWal(this); }
  };
}

export function pushWal(ctx: Wal, op: OpCode, entity: number, field: number, arg1 = 0, arg2 = 0, arg3 = 0) {
  if (ctx.walHead + ctx.WAL_ENTRY_SIZE > ctx.walU32.length) {
    const currentSize = ctx.walU32.length;

    const newSize = currentSize < MAX_DOUBLE_ELEMENTS
      ? currentSize * 2
      : currentSize + MAX_DOUBLE_ELEMENTS;

    if (newSize > HARD_LIMIT_ELEMENTS) {
      throw new Error(`[WAL] Ошибка OOM: Превышен жесткий лимит (${HARD_LIMIT_ELEMENTS} элементов)`);
    }

    const newBuf = new ArrayBuffer(newSize * 4);
    new Uint32Array(newBuf).set(ctx.walU32);
    ctx.walBuffer = newBuf;
    ctx.walU32 = new Uint32Array(ctx.walBuffer);
    ctx.walF32 = new Float32Array(ctx.walBuffer);
  }

  ctx.walU32[ctx.walHead] = op;
  ctx.walU32[ctx.walHead + 1] = entity;
  ctx.walU32[ctx.walHead + 2] = field;
  ctx.walF32[ctx.walHead + 3] = arg1;
  ctx.walF32[ctx.walHead + 4] = arg2;
  ctx.walF32[ctx.walHead + 5] = arg3;

  ctx.walHead += ctx.WAL_ENTRY_SIZE;
}

export function clearWal(ctx: Wal) {
  ctx.walHead = 0;
}

export class WalTelemetry {
  private maxElements = 0;

  // Вызывать СТРОГО ПЕРЕД вызовом wal.clear()
  trackFrame(wal: Wal) {
    if (wal.walHead > this.maxElements) {
      this.maxElements = wal.walHead;
    }
  }

  // Получить пиковое количество записей, которое когда-либо требовалось
  getPeakCapacity(wal: Wal): number {
    return Math.ceil(this.maxElements / wal.WAL_ENTRY_SIZE);
  }

  // Получить текущий размер буфера в мегабайтах (для дебага)
  getCurrentMemoryMB(wal: Wal): string {
    const bytes = wal.walBuffer.byteLength;
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  reset() {
    this.maxElements = 0;
  }
}
