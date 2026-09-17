import * as db from "@razomy/db";

export interface Store {
  capacity: number;
  nextId: db.NodeId;
  freeList: db.NodeId[];
  columns: db.column.array.Column[];

  registerColumn(column: db.column.array.Column): db.column.array.Column;

  allocate(): db.NodeId;

  free(id: db.NodeId): void;
}
