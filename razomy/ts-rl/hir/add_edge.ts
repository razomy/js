import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function addEdge(ctx: tsRl.hir.HirCtx, from: abstracts.translators.HirType, to: abstracts.translators.HirType, layer: tsRl.hir.Layer): void {
    if (!ctx.outEdges.has(from.id)) {
    ctx.outEdges.set(from.id, new Map());
    }

    const fromOut = ctx.outEdges.get(from.id)!;
    if (!fromOut.has(layer)) {
    fromOut.set(layer, new Set());
    }

    fromOut.get(layer)!.add(to.id);
    if (!ctx.inEdges.has(to.id)) {
    ctx.inEdges.set(to.id, new Map());
    }

    const toIn = ctx.inEdges.get(to.id)!;
    if (!toIn.has(layer)) {
    toIn.set(layer, new Set());
    }

    toIn.get(layer)!.add(from.id);
}
