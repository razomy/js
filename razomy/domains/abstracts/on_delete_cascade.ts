import * as abstracts from "@razomy/abstracts";

export interface Cascade {
  sourceTable: abstracts.machines.Table;
  sourceProperty: string;
  targetTable: abstracts.machines.Table;
  targetProperty: string;
}

export function onDeleteCascade(ctx: Cascade) {
  ctx.targetTable.onDelete.push((e) => {
    ctx.sourceTable.delete({ [ctx.sourceProperty]: e[ctx.targetProperty] });
  });
}
