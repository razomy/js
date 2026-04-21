import * as serializable_ from '@razomy/serializable';
import * as json from '@razomy/json';
import * as exceptions from '@razomy/exceptions';

export function toJson(serializable: serializable_.Serializable): json.Json {
  if (serializable === null) {
    return serializable;
  } else if (['string', 'number', 'boolean'].includes(typeof serializable)) {
    return serializable as json.Json;
  }
  if (Array.isArray(serializable)) {
    return serializable_.arrayToJson(serializable) as json.Json;
  } else if (typeof serializable === 'object') {
    if ('toSerializable' in serializable) {
      return (serializable as serializable_.WithSerializable).toSerializable() as json.Json;
    }
    return serializable_.dictToJson(serializable);
  }

  throw new exceptions.ArgumentException('Unknown seriasable', serializable);
}
