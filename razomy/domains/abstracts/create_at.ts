import type { Table } from '../../abstracts/machines/table';

export function createAt(ctx: { sourceTable: Table }) {
  ctx.sourceTable.onCreate.push((entity) => {
    entity.createdAt = new Date();
  });
}

export function stringDefault() {
  return '';
}

export function intDefault() {
  return 0;
}
export function boolDefault() {
  return false;
}
