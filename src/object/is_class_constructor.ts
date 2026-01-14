export function is_class_constructor(obj: any): boolean {
  return typeof obj === 'function' && obj.prototype && obj.prototype.constructor === obj;
}

export default is_class_constructor;
