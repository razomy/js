import * as db from "@razomy/db";
import * as abstractions from "@razomy/abstractions";

export function addGraphNode(ctx: db.topology.GraphTopology, astData: abstractions.translator.HirnType): db.NodeId {
    const id = ctx.core.addNode(ctx.nodeFirstOut.id);
    ctx.nodesAsn[id] = astData;
    return id;
}
