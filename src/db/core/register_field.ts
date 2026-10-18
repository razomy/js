import * as db from "@razomy/db";

export function registerField(ctx: db.core.CoreDB, store: db.store.Store, name: db.EdgeId, arrayType: db.TypedArrayConstructor<db.TypedArray>, defaultValue: number, stride: number): db.column.array.Column {
    const id = ctx.nextFieldId++;
    const col = db.column.array.createColumn(id, name, arrayType, { initialCapacity: store.capacity, defaultValue, stride });
    ctx.fieldRegistry[id] = col;
    return store.registerColumn(col);
}
