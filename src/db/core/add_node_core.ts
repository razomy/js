import * as db from "@razomy/db";

export function addNodeCore(ctx: db.core.CoreDB, fieldId: db.FieldId): db.NodeId {
    const id = ctx.nodeStore.allocate();
    ctx.wal.push(db.OP_CODE.ADD_NODE, id, fieldId);
    return id;
}
