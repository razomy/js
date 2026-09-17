import * as db from "@razomy/db";

export interface EventsContext {
  dirtyQueue: Uint32Array;
  dirtyCount: number;

  markDirty(entityId: db.NodeId, fieldId: db.FieldId): void;

  flush(): Uint32Array;
}
