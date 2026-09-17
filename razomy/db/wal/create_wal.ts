import * as db from "@razomy/db";

export function createWal(initialCapacity: number): db.wal.Wal {
    const walEntrySize = 6;
    const elementCount = initialCapacity * walEntrySize;
    const walBuffer = new ArrayBuffer(elementCount * 4);
    return {
    walEntrySize,
    walBuffer,
    walU32: new Uint32Array(walBuffer),
    walF32: new Float32Array(walBuffer),
    walHead: 0,
    push(op, entity, field, a1 = 0, a2 = 0, a3 = 0) { db.wal.pushWal(this, op, entity, field, a1, a2, a3); },
    clear() { db.wal.clearWal(this); }
    };
}
