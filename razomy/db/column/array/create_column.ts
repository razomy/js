import * as db from "@razomy/db";

export function createColumn(id: db.FieldId, name: db.EdgeId, factory: db.TypedArrayConstructor<db.TypedArray>, config: db.column.array.ColumnConfig): db.column.array.Column {
    return {
    id, name, factory: factory, config,
    array: new factory(config.initialCapacity * config.stride).fill(config.defaultValue),

    resize(newC: number, oldC: number) { db.column.array.resize(this, newC, oldC); },
    clearElement(entityId: db.NodeId) { db.column.array.clearElement(this, entityId); },
    set(entityId: db.NodeId, v: number, offset = 0) { db.column.array.set(this, entityId, v, offset); },
    get(entityId: db.NodeId, offset = 0) { return db.column.array.get(this, entityId, offset); }
    } satisfies db.column.array.Column;
}
