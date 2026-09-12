import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

type Layer = 'description' | 'parent' | 'prev' | 'next';

export function getEdges(ctx: tsRl.hir.HirCtx, node: abstracts.translators.HirType, layer: Layer) {
    const ids = ctx.outEdges.get(node.id)!.get(layer)!;
    const outNodes = ids.values().map(ctx.nodes.get);
    return outNodes.toArray()
}
