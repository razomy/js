import type { RecursiveDict } from './recursive';

export function getByPath(obj: RecursiveDict, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
