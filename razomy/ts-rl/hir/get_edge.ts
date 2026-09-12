import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

type Layer = 'description' | 'parent' | 'prev' | 'next';

export function getEdge(ctx: tsRl.hir.HirCtx, node: abstracts.translators.HirType, layer: Layer) {
    const id = ctx.outEdges.get(node.id)!.get(layer)![0];
    const outNode = ctx.nodes.get(id)!;
    return outNode
}
