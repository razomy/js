import * as abstractions from "@razomy/abstractions";

export function createAt(ctx: { sourceTable: abstractions.collection.ReactiveCollection }) {
  ctx.sourceTable.onCreate.push((entity) => {
    entity.createdAt = new Date();
  });
}
