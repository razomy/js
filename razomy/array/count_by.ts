export function countBy(collection: any, predicate = (value: any) => value) {
  const result: Record<string, any> = {};
  if (!collection) return result;
  const values = Array.isArray(collection) ? collection : Object.values(collection);
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    // Apply the predicate function (Lodash also supports string shorthands here,
    // but this covers the function case in your snippet).
    const key = predicate(value);

    // If key exists, increment; otherwise initialize to 1
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key]++;
    } else {
      result[key] = 1;
    }
  }

  return result;
}
