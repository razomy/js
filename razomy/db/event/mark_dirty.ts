import * as db from "@razomy/db";

export function markDirty(ctx: db.event.EventsContext, entityId: db.NodeId, fieldId: db.FieldId) {
    if (ctx.dirtyCount >= ctx.dirtyQueue.length - 1) {
    const newQ = new Uint32Array(ctx.dirtyQueue.length * 2);
    newQ.set(ctx.dirtyQueue);
    ctx.dirtyQueue = newQ;
    }

    ctx.dirtyQueue[ctx.dirtyCount++] = entityId;
    ctx.dirtyQueue[ctx.dirtyCount++] = fieldId;
}
