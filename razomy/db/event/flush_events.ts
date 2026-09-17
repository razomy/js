import * as db from "@razomy/db";

export function flushEvents(ctx: db.event.EventsContext): Uint32Array {
    const view = ctx.dirtyQueue.subarray(0, ctx.dirtyCount);
    ctx.dirtyCount = 0;
    return view;
}
