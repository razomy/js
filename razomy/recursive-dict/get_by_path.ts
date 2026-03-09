import type {RecursiveDict} from './recursive';
import {isObject} from '@razomy/object';

export function getByPath(obj: RecursiveDict, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function setByPath(obj: RecursiveDict, path: string, value: any): void {
  const parts = path.split('.');
  const last = parts.pop();
  if (!last) return;

  const target = parts.reduce((acc, part) => {
    if (!acc[part] || !isObject(acc[part])) acc[part] = {};
    return acc[part];
  }, obj);

  target[last] = value;
}

export function deleteByPath(obj: RecursiveDict, path: string): void {
  const parts = path.split('.');
  const last = parts.pop();
  if (!last) return;
  const target = parts.reduce((acc, part) => acc && acc[part], obj);
  if (target) delete target[last];
}

export function moveByPath(jsonObj: RecursiveDict, oldPath: string, newPath: string): void {
  // 2. Get the value from the old path
  const valueToMove = getByPath(jsonObj, oldPath);

  if (valueToMove === undefined) {
    console.log(`Value at path "${oldPath}" not found. Nothing to move.`);
    return;
  }

  // 3. Set the value to the new path
  setByPath(jsonObj, newPath, valueToMove);

  // 4. Delete the old path
  deleteByPath(jsonObj, oldPath);
}
