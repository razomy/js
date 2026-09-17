import * as db from "@razomy/db";

export function get(ctx: db.column.array.Column, entityId: db.NodeId, offset = 0): number {
    return ctx.array[entityId * ctx.config.stride + offset];
}
