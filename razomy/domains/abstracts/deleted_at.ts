import * as abstracts from "@razomy/abstracts";

export function deletedAt(ctx: { sourceTable: abstracts.collections.Collection }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.deletedAt = new Date();
  });
}
