import * as abstractions from "@razomy/abstractions";

export function deletedAt(ctx: { sourceTable: abstractions.collections.ReactiveCollection }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.deletedAt = new Date();
  });
}
