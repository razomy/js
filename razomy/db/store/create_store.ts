import * as db from "@razomy/db";

export function createStore(initialCapacity: number): db.store.Store {
    return {
    capacity: initialCapacity,
    nextId: 0,
    freeList: [],
    columns: [],
    registerColumn(column: db.column.array.Column) { return db.store.registerColumn(this, column); },
    allocate() { return db.store.allocate(this); },
    free(id: db.NodeId) { db.store.freeId(this, id); }
    };
}
