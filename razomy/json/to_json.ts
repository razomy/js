import * as json from '@razomy/json';
import * as exceptions from '@razomy/exceptions';
import * as abstracts from "@razomy/abstracts";

export function toJson(serializable: abstracts.patterns.Serializable): abstracts.patterns.Json {
  if (serializable === null) {
    return serializable;
  } else if (['string', 'number', 'boolean'].includes(typeof serializable)) {
    return serializable as abstracts.patterns.Json;
  }
  if (Array.isArray(serializable)) {
    return json.arrayToJson(serializable) as abstracts.patterns.Json;
  } else if (typeof serializable === 'object') {
    if ('toSerializable' in serializable) {
      return (serializable as abstracts.patterns.HasSerializable).toSerializable() as abstracts.patterns.Json;
    }
    return json.dictToJson(serializable);
  }

  throw new exceptions.ArgumentException('Unknown seriasable', serializable);
}
