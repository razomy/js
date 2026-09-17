import * as db from "@razomy/db";

export function registerColumn(ctx: db.store.Store, column: db.column.array.Column): db.column.array.Column {
    ctx.columns.push(column);
    return column;
}
