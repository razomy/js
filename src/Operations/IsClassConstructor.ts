export function isClassConstructor(obj) {
  return typeof obj === 'function' && obj.prototype && obj.prototype.constructor === obj;
}
