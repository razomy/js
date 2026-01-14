export default function sort_by(collection, iteratee) {
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
