import * as abstracts from "@razomy/abstracts";

export enum FsNodeType {
  DIRECTORY = 'DIRECTORY',
  FILE_JSON = 'FILE_JSON',
  FILE_STORAGE_URL = 'FILE_STORAGE_URL',
  FILE_BINARY = 'FILE_BINARY',
}

export interface FsNode extends abstracts.patterns.HasPrimaryId, abstracts.domains.CudDateTime {
  fsNodeType: FsNodeType;
  name: abstracts.primitives.Char256;
  /*
   * @index
   */
  contentJson?: abstracts.patterns.Json | abstracts.patterns.Json<{ url: abstracts.domains.Url }>;
  contentBinary?: Buffer;
  /*
   * @index
   */
  parentId?: abstracts.patterns.IdRef<FsNode>;
  /*
   * @index
   */
  ancestors: abstracts.patterns.IdRef<FsNode>[];
}

/**
 * Ошибки валидации структуры ФС
 */
export class CycleDetectedError extends Error {
  constructor(nodeId: string, parentId: string) {
    super(`Cycle detected: Node ${nodeId} cannot be a child of its own descendant ${parentId}`);
    this.name = 'CycleDetectedError';
  }
}

/**
 * Логика функции prevent_fsnode_cycles
 * Проверяет, не создает ли смена родителя циклическую зависимость
 */
export function validateFsNodeCycle(oldNode: FsNode, newNode: FsNode): void {
  if (newNode.parentId && oldNode.ancestors.includes(newNode.parentId)) {
    throw new CycleDetectedError(newNode.id, newNode.parentId.id);
  }
}
