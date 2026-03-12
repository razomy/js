import { dictToJson } from './dict_to_json';

import { arrayToJson } from './array_to_json';
import * as serializable from "@razomy/serializable";
import * as json from "@razomy/json";
import * as exceptions from "@razomy/exceptions";

export function toJson(serializable: serializable.Serializable): json.Json {
  if (serializable === null) {
    return serializable;
  } else if (['string', 'number', 'boolean'].includes(typeof serializable)) {
    return serializable as json.Json;
  }
  if (Array.isArray(serializable)) {
    return arrayToJson(serializable) as json.Json;
  } else if (typeof serializable === 'object') {
    if ('toSerializable' in serializable) {
      return (serializable as serializable.WithSerializable).toSerializable() as json.Json;
    }
    return dictToJson(serializable);
  }

  throw new exceptions.ArgumentException('Unknown seriasable', serializable);
}
