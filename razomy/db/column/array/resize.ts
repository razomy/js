import * as db from "@razomy/db";

export function resize(ctx: db.column.array.Column, newCapacity: number, oldCapacity: number) {
    const newData = new ctx.factory(newCapacity * ctx.config.stride);
    newData.set(ctx.array);
    ctx.array = newData;
    db.column.array.reset(ctx, oldCapacity * ctx.config.stride);
}
