import type {FieldId, NodeId} from "../type";

export interface EventsContext {
  dirtyQueue: Uint32Array;
  dirtyCount: number;

  markDirty(entityId: NodeId, fieldId: FieldId): void;

  flush(): Uint32Array;
}

export function createEventsContext(initialCapacity = 1024): EventsContext {
  return {
    dirtyQueue: new Uint32Array(initialCapacity * 2),
    dirtyCount: 0,
    markDirty(entityId: NodeId, fieldId: FieldId) {
      markDirty(this, entityId, fieldId);
    },
    flush() {
      return flushEvents(this);
    }
  };
}

export function markDirty(ctx: EventsContext, entityId: NodeId, fieldId: FieldId) {
  if (ctx.dirtyCount >= ctx.dirtyQueue.length - 1) {
    const newQ = new Uint32Array(ctx.dirtyQueue.length * 2);
    newQ.set(ctx.dirtyQueue);
    ctx.dirtyQueue = newQ;
  }
  ctx.dirtyQueue[ctx.dirtyCount++] = entityId;
  ctx.dirtyQueue[ctx.dirtyCount++] = fieldId;
}

export function flushEvents(ctx: EventsContext): Uint32Array {
  const view = ctx.dirtyQueue.subarray(0, ctx.dirtyCount);
  ctx.dirtyCount = 0;
  return view;
}
