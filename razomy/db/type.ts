export type NodeId = number;
export type EdgeId = string;
export type FieldId = number;

export type TypedArray = Uint8Array | Uint32Array | Float32Array;
export type TypedArrayConstructor<T> = new (size: number) => T;

export const enum OpCode {
  ADD_NODE = 1,
  SET_FIELD = 2,
  // CONNECT теперь специфичная для Топологии операция, но Ядро готово к кастомным кодам
  CONNECT = 10
}

export const enum Layer {
  Parent = 0, Prev = 1, Next = 2, Description = 3, _COUNT = 4
}

export interface IColumn {
  id: FieldId;
  name: EdgeId;
  resize(newC: number, oldC: number): void;
  clearElement(entityId: NodeId): void;
  set(entityId: NodeId, value: number, offset?: number): void;
  // get(entityId: NodeId, offset?: number): number;
  factory: TypedArrayConstructor<TypedArray>;
}
