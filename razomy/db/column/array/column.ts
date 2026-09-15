import type { EdgeId, FieldId, NodeId, TypedArray, TypedArrayConstructor } from "../../type";

export interface ColumnConfig {
  initialCapacity: number;
  defaultValue: number;
  stride: number;
}

export interface Column {
  id: FieldId;
  name: EdgeId;
  config: ColumnConfig;
  array: TypedArray;
  resize(newC: number, oldC: number): void;
  clearElement(entityId: NodeId): void;
  set(entityId: NodeId, value: number, offset?: number): void;
  get(entityId: NodeId, offset?: number): number;
  factory: TypedArrayConstructor<TypedArray>;
}

export function createColumn(
  id: FieldId, name: EdgeId, factory: TypedArrayConstructor<TypedArray>, config: ColumnConfig
): Column {
  return {
    id, name, factory: factory, config,
    array: new factory(config.initialCapacity * config.stride).fill(config.defaultValue),

    resize(newC: number, oldC: number) { resize(this, newC, oldC); },
    clearElement(entityId: NodeId) { clearElement(this, entityId); },
    set(entityId: NodeId, v: number, offset = 0) { set(this, entityId, v, offset); },
    get(entityId: NodeId, offset = 0) { return get(this, entityId, offset); }
  } satisfies Column;
}

export function reset(ctx: Column, startOffset = 0) {
  ctx.array.fill(ctx.config.defaultValue, startOffset);
}

export function resize(ctx: Column, newCapacity: number, oldCapacity: number) {
  const newData = new ctx.factory(newCapacity * ctx.config.stride);
  newData.set(ctx.array);
  ctx.array = newData;
  reset(ctx, oldCapacity * ctx.config.stride);
}

export function clearElement(ctx: Column, entityId: NodeId) {
  const start = entityId * ctx.config.stride;
  const end = start + ctx.config.stride;
  ctx.array.fill(ctx.config.defaultValue, start, end);
}

// Добавлен offset для правильной математики слоев графа
export function get(ctx: Column, entityId: NodeId, offset = 0): number {
  return ctx.array[entityId * ctx.config.stride + offset];
}

export function set(ctx: Column, entityId: NodeId, value: number, offset = 0) {
  ctx.array[entityId * ctx.config.stride + offset] = value;
}
