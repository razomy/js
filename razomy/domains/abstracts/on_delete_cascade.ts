import * as abstracts from "@razomy/abstracts";

export interface Cascade {
  sourceTable: abstracts.collections.ReactiveCollection;
  sourceProperty: string;
  targetTable: abstracts.collections.ReactiveCollection;
  targetProperty: string;
}

export function onDeleteCascade(ctx: Cascade) {
  ctx.targetTable.onDelete.push((e) => {
    ctx.sourceTable.delete_({ [ctx.sourceProperty]: e[ctx.targetProperty] });
  });
}
