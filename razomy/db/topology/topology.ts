import * as db from "@razomy/db";
import * as abstracts from "@razomy/abstracts";

export const NULL_EDGE = 0xFFFFFFFF;
export const SYSTEM_FIELDS = {NODE: 0 as db.FieldId, EDGE: 1 as db.FieldId};

export interface GraphTopology {
  core: db.core.CoreDB;
  nodesAst: (abstracts.translators.HirType | null)[];

  // Колонки топологии
  nodeFirstOut: db.column.array.Column;
  nodeFirstIn: db.column.array.Column;
  edgeFrom: db.column.array.Column;
  edgeTo: db.column.array.Column;
  edgeLayer: db.column.array.Column;
  edgeNextOut: db.column.array.Column;
  edgeNextIn: db.column.array.Column;

  // Методы делегируют работу
  addNode(astData: abstracts.translators.HirType): db.NodeId;

  connect(from: db.NodeId, to: db.NodeId, layer: db.Layer): db.NodeId;

  commit(): void;
}
