import * as db from "@razomy/db";

const maxDoubleElements = 4 * 1024 * 1024;
  // ~16 МБ (порог умного ресайза)
const hardLimitElements = 64 * 1024 * 1024;

export function pushWal(ctx: db.wal.Wal, op: db.OpCode, entity: number, field: number, arg1 = 0, arg2 = 0, arg3 = 0) {
    if (ctx.walHead + ctx.walEntrySize > ctx.walU32.length) {
    const currentSize = ctx.walU32.length;

    const newSize = currentSize < maxDoubleElements
      ? currentSize * 2
      : currentSize + maxDoubleElements;

    if (newSize > hardLimitElements) {
      throw new Error(`[WAL] Ошибка OOM: Превышен жесткий лимит (${hardLimitElements} элементов)`);
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
    ctx.walHead += ctx.walEntrySize;
}
