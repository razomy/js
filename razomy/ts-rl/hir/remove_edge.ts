import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function removeEdge(ctx: tsRl.hir.HirCtx, fromId: abstracts.domains.Id, toId: abstracts.domains.Id, layer: tsRl.hir.Layer): void {
  // Удаляем из outgoing
  if (ctx.outEdges.has(fromId)) {
    const layerSet = ctx.outEdges.get(fromId)!.get(layer);
    if (layerSet) layerSet.delete(toId);
  }

  // Удаляем из incoming
  if (ctx.inEdges.has(toId)) {
    const layerSet = ctx.inEdges.get(toId)!.get(layer);
    if (layerSet) layerSet.delete(fromId);
  }
}
