import type { HasPrimaryId } from '../../abstracts/domains/has_id';
import type { Char256 } from '../../abstracts/primitives/primitives';
import type { Json } from '../../abstracts/domains/serializable';
import type { CudDateTime, IdRef } from '@razomy/abstracts/domains';
import type { Url } from '../../abstracts/graphs/path_string';

export enum FsNodeType {
  DIRECTORY = 'DIRECTORY',
  FILE_JSON = 'FILE_JSON',
  FILE_STORAGE_URL = 'FILE_STORAGE_URL',
  FILE_BINARY = 'FILE_BINARY',
}

export interface FsNode extends HasPrimaryId, CudDateTime {
  fsNodeType: FsNodeType;
  name: Char256;
  /*
   * @index
   */
  contentJson?: Json | Json<{ url: Url }>;
  contentBinary?: Buffer;
  /*
   * @index
   */
  parentId?: IdRef<FsNode>;
  /*
   * @index
   */
  ancestors: IdRef<FsNode>[];
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
