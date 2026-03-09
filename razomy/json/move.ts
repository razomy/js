export function move(jsonObj, oldPath, newPath) {
  // 2. Get the value from the old path
  const valueToMove = getValue(jsonObj, oldPath);

  if (valueToMove === undefined) {
    console.log(`Value at path "${oldPath}" not found. Nothing to move.`);
    return;
  }

  // 3. Set the value to the new path
  setValue(jsonObj, newPath, valueToMove);

  // 4. Delete the old path
  // deleteValue(jsonObj, oldPath);
}

const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
// Function to check if an item is an object
// Recursive function to deeply merge objects
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return sort(mergeDeep(target, ...sources));
  // return sort(target);
}
function getDetailedDiff(oldObj, newObj) {
  const diff = {};

  // Get all unique keys from both objects
  const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  keys.forEach(key => {
    const oldVal = oldObj[key];
    const newVal = newObj[key];

    // 1. If key exists in old but not new: DELETED
    if (key in oldObj && !(key in newObj)) {
      diff[key] = {type: 'DELETED', oldValue: oldVal};
    }
    // 2. If key exists in new but not old: CREATED
    else if (!(key in oldObj) && key in newObj) {
      diff[key] = {type: 'CREATED', newValue: newVal};
    }
    // 3. If both are objects: RECURSIVE CHECK
    else if (isObject(oldVal) && isObject(newVal)) {
      const nestedDiff = getDetailedDiff(oldVal, newVal);
      // Only add to result if there are actual changes inside
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = {type: 'NESTED_UPDATE', children: nestedDiff};
      }
    }
    // 4. If values are different (primitives): UPDATED
    else if (oldVal !== newVal) {
      // diff[key] = {type: 'UPDATED', oldValue: oldVal, newValue: newVal};
    }
  });

  return diff;
}

function getValue(diff) {
  if (diff.type === 'CREATED') {
    return diff.newValue;
  }
  if (diff.type === 'UPDATED') {
    return diff.newValue;
  }
  if (diff.type === 'DELETED') {
    return undefined;
  }
  if (diff.type === 'NESTED_UPDATE') {
    return Object.fromEntries(Object.keys(diff.children)
      .map((k) => [k, getValue(diff.children[k])]))
  }

  throw new Error(diff)
}
