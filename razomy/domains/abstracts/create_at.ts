import * as abstracts from "@razomy/abstracts";

export function createAt(ctx: { sourceTable: abstracts.collections.Collection }) {
  ctx.sourceTable.onCreate.push((entity) => {
    entity.createdAt = new Date();
  });
}
