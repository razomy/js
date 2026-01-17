export function isPlainObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check internal [[Class]] tag
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  // If the object has no prototype (e.g., Object.create(null)), it is plain.
  let proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }

  // Iterate up the prototype chain to find the top-most prototype.
  // In a plain object, the prototype must be Object.prototype.
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}