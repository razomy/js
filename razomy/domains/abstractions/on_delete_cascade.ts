import * as abstractions from "@razomy/abstractions";

export interface Cascade {
  sourceTable: abstractions.collections.ReactiveCollection;
  sourceProperty: string;
  targetTable: abstractions.collections.ReactiveCollection;
  targetProperty: string;
}

export function onDeleteCascade(ctx: Cascade) {
  ctx.targetTable.onDelete.push((e) => {
    ctx.sourceTable.delete_({ [ctx.sourceProperty]: e[ctx.targetProperty] });
  });
}
