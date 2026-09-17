import * as db from "@razomy/db";

export function reset(ctx: db.column.array.Column, startOffset = 0) {
    ctx.array.fill(ctx.config.defaultValue, startOffset);
}
