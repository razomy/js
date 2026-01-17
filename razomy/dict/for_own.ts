export function forOwn(object, iteratee) {
  object = Object(object);
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // Lodash passes: value, key, object
    const result = iteratee(object[key], key, object);

    // Allow breaking the loop if iteratee returns false
    if (result === false) {
      break;
    }
  }

  return object;
}
