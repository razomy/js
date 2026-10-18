import * as db from "@razomy/db";

export function connectGraph(ctx: db.topology.GraphTopology, from: db.NodeId, to: db.NodeId, layer: db.Layer): db.NodeId {
    const edgeId = ctx.core.edgeStore.allocate();
    ctx.core.wal.push(db.OP_CODE.CONNECT, edgeId, ctx.edgeFrom.id, from, to, layer);
    return edgeId;
}
