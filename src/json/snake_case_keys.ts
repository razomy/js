import * as abstractions from '@razomy/abstractions';

export function snakeCaseKeys(obj: abstractions.patterns.Json): abstractions.patterns.Json {
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(snakeCaseKeys);
  }

  // Handle objects
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.snakeCase()] = snakeCaseKeys(obj[key]);
      return acc;
    }, {});
  }

  // Return primitive values as-is (strings, numbers, booleans, null)
  return obj;
}
