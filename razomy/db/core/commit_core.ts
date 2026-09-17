import * as db from "@razomy/db";

export function commitCore(ctx: db.core.CoreDB, customHandler?: db.core.CustomOpHandler) {
    const { wal, events, fieldRegistry } = ctx;
    for (let i = 0; i < wal.walHead; i += wal.walEntrySize) {
    const op = wal.walU32[i];
    const entityId = wal.walU32[i + 1];
    const fieldId = wal.walU32[i + 2];
    const a1 = wal.walF32[i + 3];
    const a2 = wal.walF32[i + 4];
    const a3 = wal.walF32[i + 5];

    if (op === db.OP_CODE.ADD_NODE) {
      events.markDirty(entityId, fieldId);
    }
    else if (op === db.OP_CODE.SET_FIELD) {
      const col = fieldRegistry[fieldId];
      if (col) col.set(entityId, a1);
      events.markDirty(entityId, fieldId);
    }
    else if (customHandler) {
      // Любые операции, которые Ядро не понимает, передаются плагину Топологии
      customHandler(op, entityId, fieldId, a1, a2, a3);
    }
    }

    wal.clear();
}
