import * as db from "@razomy/db";

export function commitGraph(ctx: db.topology.GraphTopology) {
    ctx.core.commit((op, entityId, fieldId, from, to, layer) => {
    if (op === db.OP_CODE.CONNECT) {
      db.topology.applyConnect(ctx, entityId, fieldId, from, to, layer);
    }
    });
}
