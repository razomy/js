import type { RecursiveDict } from './recursive';
import { getByPath } from './get_by_path';
import { setByPath } from './set_by_path';
import { deleteByPath } from './delete_by_path';

export function moveByPath(jsonObj: RecursiveDict, oldPath: string, newPath: string): void {
  const valueToMove = getByPath(jsonObj, oldPath);
  if (valueToMove === undefined) {
    console.log(`Value at path "${oldPath}" not found. Nothing to move.`);
    return;
  }

  setByPath(jsonObj, newPath, valueToMove);
  deleteByPath(jsonObj, oldPath);
}
