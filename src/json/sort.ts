export function sort(object) {
  if (object === undefined || object === null) {
    return object;
  }
  if (typeof object != "object") {
    return object;
  }
  if (object instanceof Array) {
    return [...object.map((i) => sort(i))];
  }
  var keys = Object.keys(object);
  keys.sort();
  var newObject = {};
  for (var i = 0; i < keys.length; i++) {
    newObject[keys[i]] = sort(object[keys[i]]);
  }
  return newObject;
}

