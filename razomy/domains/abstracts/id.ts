import * as abstracts from "@razomy/abstracts";
import * as random from "@razomy/random";

export function id(ctx: { sourceTable: abstracts.collections.ReactiveCollection }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.id = random.createUuid();
  });
}
