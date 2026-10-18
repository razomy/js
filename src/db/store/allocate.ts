import * as db from "@razomy/db";

export function allocate(ctx: db.store.Store): db.NodeId {
    if (ctx.freeList.length > 0) return ctx.freeList.pop()!;
    if (ctx.nextId >= ctx.capacity) {
    const oldCap = ctx.capacity;
    ctx.capacity *= 2;
    for (let i = 0; i < ctx.columns.length; i++) {
      db.column.array.resize(ctx.columns[i], ctx.capacity, oldCap); // Переиспользуем внешнюю функцию колонки
    }
    }

    return ctx.nextId++;
}
