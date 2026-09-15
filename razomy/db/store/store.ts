import type { NodeId } from "../type";
import { type Column, resize, clearElement } from "../column/array/column";

export interface Store {
  capacity: number;
  nextId: NodeId;
  freeList: NodeId[];
  columns: Column[];
  registerColumn(column: Column): Column;
  allocate(): NodeId;
  free(id: NodeId): void;
}

export function createStore(initialCapacity: number): Store {
  return {
    capacity: initialCapacity,
    nextId: 0,
    freeList: [],
    columns: [],
    registerColumn(column: Column) { return registerColumn(this, column); },
    allocate() { return allocate(this); },
    free(id: NodeId) { freeId(this, id); }
  };
}

export function registerColumn(ctx: Store, column: Column): Column {
  ctx.columns.push(column);
  return column;
}

export function allocate(ctx: Store): NodeId {
  if (ctx.freeList.length > 0) return ctx.freeList.pop()!;

  if (ctx.nextId >= ctx.capacity) {
    const oldCap = ctx.capacity;
    ctx.capacity *= 2;
    for (let i = 0; i < ctx.columns.length; i++) {
      resize(ctx.columns[i], ctx.capacity, oldCap); // Переиспользуем внешнюю функцию колонки
    }
  }
  return ctx.nextId++;
}

export function freeId(ctx: Store, id: NodeId) {
  if (ctx.freeList.includes(id) || id >= ctx.nextId) return;

  for (let i = 0; i < ctx.columns.length; i++) {
    clearElement(ctx.columns[i], id); // Переиспользуем внешнюю функцию колонки
  }
  ctx.freeList.push(id);
}
