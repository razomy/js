import * as db from "@razomy/db";

export function applyConnect(ctx: db.topology.GraphTopology, edgeId: db.NodeId, fieldId: db.FieldId, from: number, to: number, layer: number) {
    ctx.edgeFrom.set(edgeId, from);
    ctx.edgeTo.set(edgeId, to);
    ctx.edgeLayer.set(edgeId, layer);
    const prevOut = ctx.nodeFirstOut.get(from, layer);
    ctx.edgeNextOut.set(edgeId, prevOut);
    ctx.nodeFirstOut.set(from, edgeId, layer);
    const prevIn = ctx.nodeFirstIn.get(to, layer);
    ctx.edgeNextIn.set(edgeId, prevIn);
    ctx.nodeFirstIn.set(to, edgeId, layer);
    ctx.core.events.markDirty(edgeId, fieldId);
}
