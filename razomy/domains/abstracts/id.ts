import type { Table } from '../../abstracts/machines/table';
import { createUuid } from '@razomy/random';

export function id(ctx: { sourceTable: Table }) {
  ctx.sourceTable.onDelete.push((entity) => {
    entity.id = createUuid();
  });
}
