import * as abstracts from "@razomy/abstracts";

export function updateAt(ctx: { sourceTable: abstracts.collections.Collection }) {
  ctx.sourceTable.onUpdate.push((entity) => {
    entity.updatedAt = new Date();
  });
}
