export function mergeDeep<T extends PlainObject>(target: T, ...sources: PlainObject[]): T {
    if (!sources.length) return target;
    const source = sources.shift();
    if (source && isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key] as PlainObject, source[key] as PlainObject);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
    }

    return mergeDeep(target, ...sources);
}
