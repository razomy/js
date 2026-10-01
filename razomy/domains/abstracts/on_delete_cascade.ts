import * as abstracts from "@razomy/abstracts";

export interface Cascade {
  sourceTable: abstracts.collections.Collection;
  sourceProperty: string;
  targetTable: abstracts.collections.Collection;
  targetProperty: string;
}

export function onDeleteCascade(ctx: Cascade) {
  ctx.targetTable.onDelete.push((e) => {
    ctx.sourceTable.delete({ [ctx.sourceProperty]: e[ctx.targetProperty] });
  });
}
