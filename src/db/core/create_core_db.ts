import * as db from "@razomy/db";

export function createCoreDb(initialCapacity = 1024): db.core.CoreDB {
    return {
    nodeStore: db.store.createStore(initialCapacity),
    edgeStore: db.store.createStore(initialCapacity),
    fieldRegistry: [],
    wal: db.wal.createWal(initialCapacity),
    events: db.event.createEventsContext(initialCapacity),
    nextFieldId: 0,

    registerField(store, name, ArrayType, def, stride) { return db.core.registerField(this, store, name, ArrayType, def, stride); },
    addNode(fieldId) { return db.core.addNodeCore(this, fieldId); },
    setField(field, entityId, value) { db.core.setFieldCore(this, field, entityId, value); },
    commit(customHandler) { db.core.commitCore(this, customHandler); }
    };
}
