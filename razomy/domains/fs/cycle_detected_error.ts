import * as abstractions from "@razomy/abstractions";

export enum FsNodeType {
  DIRECTORY = 'DIRECTORY',
  FILE_JSON = 'FILE_JSON',
  FILE_STORAGE_URL = 'FILE_STORAGE_URL',
  FILE_BINARY = 'FILE_BINARY',
}

export interface FsNode extends abstractions.patterns.HasPrimaryId, abstractions.patterns.CrudDateTime {
  fsNodeType: FsNodeType;
  name: abstractions.primitive.Char256;
  /*
   * @index
   */
  contentJson?: abstractions.patterns.Json | abstractions.patterns.Json<{ url: abstractions.path.Url }>;
  contentBinary?: Buffer;
  /*
   * @index
   */
  parentId?: abstractions.patterns.IdRef<FsNode>;
  /*
   * @index
   */
  ancestors: abstractions.patterns.IdRef<FsNode>[];
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
