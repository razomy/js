import * as json from '@razomy/json';
import * as exceptions from '@razomy/exceptions';
import * as abstractions from "@razomy/abstractions";

export function toJson(serializable: abstractions.patterns.Serializable): abstractions.patterns.Json {
  if (serializable === null) {
    return serializable;
  } else if (['string', 'number', 'boolean'].includes(typeof serializable)) {
    return serializable as abstractions.patterns.Json;
  }
  if (Array.isArray(serializable)) {
    return json.arrayToJson(serializable) as abstractions.patterns.Json;
  } else if (typeof serializable === 'object') {
    if ('toSerializable' in serializable) {
      return (serializable as abstractions.patterns.HasSerializable).toSerializable() as abstractions.patterns.Json;
    }
    return json.dictToJson(serializable);
  }

  throw new exceptions.ArgumentException('Unknown seriasable', serializable);
}
