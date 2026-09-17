import * as db from "@razomy/db";

export function createEventsContext(initialCapacity = 1024): db.event.EventsContext {
    return {
    dirtyQueue: new Uint32Array(initialCapacity * 2),
    dirtyCount: 0,
    markDirty(entityId: db.NodeId, fieldId: db.FieldId) {
      db.event.markDirty(this, entityId, fieldId);
    },
    flush() {
      return db.event.flushEvents(this);
    }
    };
}
