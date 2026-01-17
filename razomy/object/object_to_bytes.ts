import sizeof from 'object-sizeof';

export function objectToBytes(obj: any): number {
  return sizeof(obj);
}