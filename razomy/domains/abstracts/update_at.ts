import * as abstracts from "@razomy/abstracts";

export function updateAt(ctx: { sourceTable: abstracts.machines.Table }) {
  ctx.sourceTable.onUpdate.push((entity) => {
    entity.updatedAt = new Date();
  });
}
