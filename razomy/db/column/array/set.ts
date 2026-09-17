import * as db from "@razomy/db";

export function set(ctx: db.column.array.Column, entityId: db.NodeId, value: number, offset = 0) {
    ctx.array[entityId * ctx.config.stride + offset] = value;
}
