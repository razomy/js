import type { Table } from '../../abstracts/machines/table';

export function updateAt(ctx: { sourceTable: Table }) {
  ctx.sourceTable.onUpdate.push((entity) => {
    entity.updatedAt = new Date();
  });
}
