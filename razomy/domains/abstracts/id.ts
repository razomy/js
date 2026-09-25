import * as abstracts from "@razomy/abstracts";
import * as random from "@razomy/random";

export function id(ctx: { sourceTable: abstracts.machines.Table }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.id = random.createUuid();
  });
}
