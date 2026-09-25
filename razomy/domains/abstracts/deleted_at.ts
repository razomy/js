import * as abstracts from "@razomy/abstracts";

export function deletedAt(ctx: { sourceTable: abstracts.machines.Table }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.deletedAt = new Date();
  });
}
