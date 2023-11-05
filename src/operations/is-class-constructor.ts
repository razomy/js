export function isClassConstructor(obj: any): boolean {
  return typeof obj === 'function' && obj.prototype && obj.prototype.constructor === obj;
}