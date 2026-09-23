import type { Table } from '../../abstracts/machines/table';

export function deletedAt(ctx: { sourceTable: Table }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.deletedAt = new Date();
  });
}
