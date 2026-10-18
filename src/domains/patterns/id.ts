import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";

export function id(ctx: { sourceTable: abstractions.collection.ReactiveCollection }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.id = random.createUuid();
  });
}
