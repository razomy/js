import * as abstractions from "@razomy/abstractions";

export function updateAt(ctx: { sourceTable: abstractions.collection.ReactiveCollection }) {
  ctx.sourceTable.onUpdate.push((entity) => {
    entity.updatedAt = new Date();
  });
}
