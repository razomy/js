export function countBy(collection, iteratee = (value) => value) {
  const result = {};
  if (!collection) return result;
  const values = Array.isArray(collection) ? collection : Object.values(collection);
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    // Apply the iteratee function (Lodash also supports string shorthands here,
    // but this covers the function case in your snippet).
    const key = iteratee(value);

    // If key exists, increment; otherwise initialize to 1
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key]++;
    } else {
      result[key] = 1;
    }
  }

  return result;
}
