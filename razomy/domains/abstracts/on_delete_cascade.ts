import type { Table } from '../../abstracts/machines/table';

export interface Cascade {
  sourceTable: Table;
  sourceProperty: string;
  targetTable: Table;
  targetProperty: string;
}

export function onDeleteCascade(ctx: Cascade) {
  ctx.targetTable.onDelete.push((e) => {
    ctx.sourceTable.delete({ [ctx.sourceProperty]: e[ctx.targetProperty] });
  });
}
