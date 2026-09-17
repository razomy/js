import * as db from "@razomy/db";
import * as abstracts from "@razomy/abstracts";

export function addGraphNode(ctx: db.topology.GraphTopology, astData: abstracts.translators.HirType): db.NodeId {
    const id = ctx.core.addNode(ctx.nodeFirstOut.id);
    ctx.nodesAst[id] = astData;
    return id;
}
