export type NodeId = number;
export type EdgeId = string;
export type FieldId = number;

export type TypedArray = Uint8Array | Uint32Array | Float32Array;
export type TypedArrayConstructor<T> = new (size: number) => T;

export const OP_CODE = {
  ADD_NODE: 1,
  SET_FIELD: 2,
  // CONNECT теперь специфичная для Топологии операция, но Ядро готово к кастомным кодам
  CONNECT: 10
}
export type  OpCode = typeof LAYER[keyof typeof LAYER]

export const LAYER = {
  Parent: 0, Prev: 1, Next: 2, Description: 3, _COUNT: 4
}

export type  Layer = typeof LAYER[keyof typeof LAYER]

export interface IColumn {
  id: FieldId;
  name: EdgeId;
  // get(entityId: NodeId, offset?: number): number;
  factory: TypedArrayConstructor<TypedArray>;

  resize(newC: number, oldC: number): void;

  clearElement(entityId: NodeId): void;

  set(entityId: NodeId, value: number, offset?: number): void;
}
