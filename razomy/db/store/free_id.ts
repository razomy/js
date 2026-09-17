import * as db from "@razomy/db";

export function freeId(ctx: db.store.Store, id: db.NodeId) {
    if (ctx.freeList.includes(id) || id >= ctx.nextId) return;
    for (let i = 0; i < ctx.columns.length; i++) {
    db.column.array.clearElement(ctx.columns[i], id); // Переиспользуем внешнюю функцию колонки
    }

    ctx.freeList.push(id);
}
