// Define the callback type
// Returns `boolean | void` (void covers undefined when no return statement is used)
export type JsonIterateCallback = (
  value: any,
  key: string | number | undefined,
  parent: any | undefined
) => boolean | void;

export function iterate(data: any, callback: JsonIterateCallback): void {
  // Helper function to handle the recursion and breaking
  function walk(currentValue: any, key: string | number | undefined, parent: any): boolean {

    // 1. Call the callback on the current item
    const result = callback(currentValue, key, parent);

    // 2. If exactly `false` is returned, stop iteration entirely
    if (result === false) {
      return false;
    }

    // 3. If it's an Array, iterate over its elements
    if (Array.isArray(currentValue)) {
      for (let i = 0; i < currentValue.length; i++) {
        const shouldContinue = walk(currentValue[i], i, currentValue);
        if (shouldContinue === false) return false; // Bubble up the break
      }
    }
    // 4. If it's an Object (and not null), iterate over its keys
    else if (currentValue !== null && typeof currentValue === "object") {
      for (const k of Object.keys(currentValue)) {
        const shouldContinue = walk(currentValue[k], k, currentValue);
        if (shouldContinue === false) return false; // Bubble up the break
      }
    }

    // Continue iteration by default (handles the undefined requirement)
    return true;
  }

  // Start the traversal with the root object
  walk(data, undefined, undefined);
}
