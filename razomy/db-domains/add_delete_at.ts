import * as abstracts from "@razomy/abstracts";

export function addDeleteAt(ctx: abstracts.domains.HasDeletedAt) {
  ctx.deletedAt = new Date();
}
