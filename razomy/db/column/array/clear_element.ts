import * as db from "@razomy/db";

export function clearElement(ctx: db.column.array.Column, entityId: db.NodeId) {
    const start = entityId * ctx.config.stride;
    const end = start + ctx.config.stride;
    ctx.array.fill(ctx.config.defaultValue, start, end);
}
