import * as abstractions from "@razomy/abstractions";

export function deletedAt(ctx: { sourceTable: abstractions.collection.ReactiveCollection }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.deletedAt = new Date();
  });
}
