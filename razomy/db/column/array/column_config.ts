import * as db from "@razomy/db";

export interface ColumnConfig {
  initialCapacity: number;
  defaultValue: number;
  stride: number;
}

export interface Column {
  id: db.FieldId;
  name: db.EdgeId;
  config: ColumnConfig;
  array: db.TypedArray;
  resize(newC: number, oldC: number): void;
  clearElement(entityId: db.NodeId): void;
  set(entityId: db.NodeId, value: number, offset?: number): void;
  get(entityId: db.NodeId, offset?: number): number;
  factory: db.TypedArrayConstructor<db.TypedArray>;
}
