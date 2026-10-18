import * as db from "@razomy/db";

export function setFieldCore(ctx: db.core.CoreDB, field: db.column.array.Column, entityId: db.NodeId, value: number) {
    ctx.wal.push(db.OP_CODE.SET_FIELD, entityId, field.id, value);
}
