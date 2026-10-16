import * as abstractions from "@razomy/abstractions";

export function updateAt(ctx: { sourceTable: abstractions.collections.ReactiveCollection }) {
  ctx.sourceTable.onUpdate.push((entity) => {
    entity.updatedAt = new Date();
  });
}
