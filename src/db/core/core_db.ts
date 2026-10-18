import * as db from "@razomy/db";

export type CustomOpHandler = (op: number, entityId: number, fieldId: number, a1: number, a2: number, a3: number) => void;

export interface CoreDB {
  nodeStore: db.store.Store;
  edgeStore: db.store.Store;
  fieldRegistry: db.column.array.Column[];
  wal: db.wal.Wal;
  events: db.event.EventsContext;
  nextFieldId: db.FieldId;

  // Методы делегируют работу переиспользуемым функциям
  registerField(store: db.store.Store, name: db.EdgeId, ArrayType: db.TypedArrayConstructor<db.TypedArray>, def: number, stride: number): db.column.array.Column;

  addNode(fieldId: db.FieldId): db.NodeId;

  setField(field: db.column.array.Column, entityId: db.NodeId, value: number): void;

  commit(customHandler?: CustomOpHandler): void;
}
