export function uniq(array) {
  const result: any[] = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (!result.includes(value)) {
      result.push(value);
    }
  }
  return result;
}


export function count_by(collection, iteratee = (value) => value) {
  const result = {};

  // Handle empty or null collections
  if (!collection) return result;

  // Ensure we have an array-like structure
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

export function sort_by(collection, iteratee) {
  let index = 0;
  const length = collection.length;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    const value = collection[i];
    result[i] = {
      value: value,
      index: index++,
      criteria: iteratee(value)
    };
  }

  result.sort((a, b) => {
    const valA = a.criteria;
    const valB = b.criteria;

    if (valA !== valB) {
      if (valA > valB || valA === undefined) return 1;
      if (valA < valB || valB === undefined) return -1;
    }

    return a.index - b.index;
  });

  for (let i = 0; i < length; i++) {
    result[i] = result[i].value;
  }

  return result;
}


function sort_by_frequency_and_unique(arr: []) {
  const frequency_map = count_by(arr);

  const unique_sorted = sort_by(uniq(arr), (item) => {
    return -frequency_map[item];
  });

  return unique_sorted;
}

export default sort_by_frequency_and_unique;
