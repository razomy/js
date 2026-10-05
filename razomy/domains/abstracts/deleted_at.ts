import * as abstracts from "@razomy/abstracts";

export function deletedAt(ctx: { sourceTable: abstracts.collections.ReactiveCollection }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.deletedAt = new Date();
  });
}
