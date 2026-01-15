import sizeof from 'object-sizeof';

export function object_to_bytes(obj: any): number {
  return sizeof(obj);
}