import { Layer, OpCode, type NodeId, type FieldId } from "./type";
import type { CoreDB } from "./core";
import type { Column } from "./column/array/column";
import type { HirType } from "@razomy/abstracts/translators"; // Ваша зависимость

export const NULL_EDGE = 0xFFFFFFFF;
export const SYSTEM_FIELDS = { NODE: 0 as FieldId, EDGE: 1 as FieldId };

export interface GraphTopology {
  core: CoreDB;
  nodesAst: (HirType | null)[];

  // Колонки топологии
  nodeFirstOut: Column; nodeFirstIn: Column;
  edgeFrom: Column; edgeTo: Column; edgeLayer: Column;
  edgeNextOut: Column; edgeNextIn: Column;

  // Методы делегируют работу
  addNode(astData: HirType): NodeId;
  connect(from: NodeId, to: NodeId, layer: Layer): NodeId;
  commit(): void;
}

export function createGraphTopology(core: CoreDB): GraphTopology {
  return {
    core,
    nodesAst: [],

    // Регистрируем колонки в Ядре. Узлы получают stride = Layer._COUNT!
    nodeFirstOut: core.registerField(core.nodeStore, "nFirstOut", Uint32Array, NULL_EDGE, Layer._COUNT),
    nodeFirstIn:  core.registerField(core.nodeStore, "nFirstIn",  Uint32Array, NULL_EDGE, Layer._COUNT),

    // Грани получают stride = 1
    edgeFrom:    core.registerField(core.edgeStore, "eFrom", Uint32Array, 0, 1),
    edgeTo:      core.registerField(core.edgeStore, "eTo",   Uint32Array, 0, 1),
    edgeLayer:   core.registerField(core.edgeStore, "eLayer", Uint8Array, 0, 1),
    edgeNextOut: core.registerField(core.edgeStore, "eNextOut", Uint32Array, NULL_EDGE, 1),
    edgeNextIn:  core.registerField(core.edgeStore, "eNextIn",  Uint32Array, NULL_EDGE, 1),

    addNode(astData) { return addGraphNode(this, astData); },
    connect(from, to, layer) { return connectGraph(this, from, to, layer); },
    commit() { commitGraph(this); }
  };
}

// --- Вынесенные (reusable) функции Топологии ---

export function addGraphNode(ctx: GraphTopology, astData: HirType): NodeId {
  // Вызываем базовое ядро
  const id = ctx.core.addNode(ctx.nodeFirstOut.id);
  ctx.nodesAst[id] = astData;
  return id;
}

export function connectGraph(ctx: GraphTopology, from: NodeId, to: NodeId, layer: Layer): NodeId {
  const edgeId = ctx.core.edgeStore.allocate();
  // Пишем операцию CONNECT в базовый WAL Ядра
  ctx.core.wal.push(OpCode.CONNECT, edgeId, ctx.edgeFrom.id, from, to, layer);
  return edgeId;
}

export function commitGraph(ctx: GraphTopology) {
  // Вызываем коммит Ядра и передаем обработчик для операции CONNECT
  ctx.core.commit((op, entityId, fieldId, from, to, layer) => {
    if (op === OpCode.CONNECT) {
      applyConnect(ctx, entityId, fieldId, from, to, layer);
    }
  });
}

// Выделенная логика связных списков
export function applyConnect(ctx: GraphTopology, edgeId: NodeId, fieldId: FieldId, from: number, to: number, layer: number) {
  ctx.edgeFrom.set(edgeId, from);
  ctx.edgeTo.set(edgeId, to);
  ctx.edgeLayer.set(edgeId, layer);

  // Используем `layer` как offset (баг со stride решен раз и навсегда)
  const prevOut = ctx.nodeFirstOut.get(from, layer);
  ctx.edgeNextOut.set(edgeId, prevOut);
  ctx.nodeFirstOut.set(from, edgeId, layer);

  const prevIn = ctx.nodeFirstIn.get(to, layer);
  ctx.edgeNextIn.set(edgeId, prevIn);
  ctx.nodeFirstIn.set(to, edgeId, layer);

  ctx.core.events.markDirty(edgeId, fieldId);
}
