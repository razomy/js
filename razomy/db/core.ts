import { OpCode, type NodeId, type EdgeId, type FieldId, type TypedArrayConstructor, type TypedArray } from "./type";
import { createColumn, type Column } from "./column/array/column";
import { createStore, type Store } from "./store/store";
import { createWal, type Wal } from "./store/wal";
import { createEventsContext, type EventsContext } from "./event/event";

export type CustomOpHandler = (op: number, entityId: number, fieldId: number, a1: number, a2: number, a3: number) => void;

export interface CoreDB {
  nodeStore: Store;
  edgeStore: Store;
  fieldRegistry: Column[];
  wal: Wal;
  events: EventsContext;
  nextFieldId: FieldId;

  // Методы делегируют работу переиспользуемым функциям
  registerField(store: Store, name: EdgeId, ArrayType: TypedArrayConstructor<TypedArray>, def: number, stride: number): Column;
  addNode(fieldId: FieldId): NodeId;
  setField(field: Column, entityId: NodeId, value: number): void;
  commit(customHandler?: CustomOpHandler): void;
}

export function createCoreDB(initialCapacity = 1024): CoreDB {
  return {
    nodeStore: createStore(initialCapacity),
    edgeStore: createStore(initialCapacity),
    fieldRegistry: [],
    wal: createWal(initialCapacity),
    events: createEventsContext(initialCapacity),
    nextFieldId: 0,

    registerField(store, name, ArrayType, def, stride) { return registerField(this, store, name, ArrayType, def, stride); },
    addNode(fieldId) { return addNodeCore(this, fieldId); },
    setField(field, entityId, value) { setFieldCore(this, field, entityId, value); },
    commit(customHandler) { commitCore(this, customHandler); }
  };
}

// --- Вынесенные (reusable) функции Ядра ---

export function registerField(ctx: CoreDB, store: Store, name: EdgeId, ArrayType: TypedArrayConstructor<TypedArray>, defaultValue: number, stride: number): Column {
  const id = ctx.nextFieldId++;
  const col = createColumn(id, name, ArrayType, { initialCapacity: store.capacity, defaultValue, stride });
  ctx.fieldRegistry[id] = col;
  return store.registerColumn(col);
}

export function addNodeCore(ctx: CoreDB, fieldId: FieldId): NodeId {
  const id = ctx.nodeStore.allocate();
  ctx.wal.push(OpCode.ADD_NODE, id, fieldId);
  return id;
}

export function setFieldCore(ctx: CoreDB, field: Column, entityId: NodeId, value: number) {
  ctx.wal.push(OpCode.SET_FIELD, entityId, field.id, value);
}

export function commitCore(ctx: CoreDB, customHandler?: CustomOpHandler) {
  const { wal, events, fieldRegistry } = ctx;

  for (let i = 0; i < wal.walHead; i += wal.WAL_ENTRY_SIZE) {
    const op = wal.walU32[i];
    const entityId = wal.walU32[i + 1];
    const fieldId = wal.walU32[i + 2];
    const a1 = wal.walF32[i + 3];
    const a2 = wal.walF32[i + 4];
    const a3 = wal.walF32[i + 5];

    if (op === OpCode.ADD_NODE) {
      events.markDirty(entityId, fieldId);
    }
    else if (op === OpCode.SET_FIELD) {
      const col = fieldRegistry[fieldId];
      if (col) col.set(entityId, a1);
      events.markDirty(entityId, fieldId);
    }
    else if (customHandler) {
      // Любые операции, которые Ядро не понимает, передаются плагину Топологии
      customHandler(op, entityId, fieldId, a1, a2, a3);
    }
  }
  wal.clear();
}
