import {dictToJson} from './dict_to_json';

import {arrayToJson} from './array_to_json';
import {WithSerializable} from 'razomy.serializable';
import {Serializable} from 'razomy.serializable';
import {Json} from 'razomy.json';
import {ArgumentException} from 'razomy.exceptions';

export function toJson(serializable: Serializable): Json {
  if (serializable === null) {
    return serializable;
  } else if (['string', 'number', 'boolean'].includes(typeof serializable)) {
    return serializable as Json;
  }
  if (Array.isArray(serializable)) {
    return arrayToJson(serializable) as Json;
  } else if (typeof serializable === 'object') {
    if ('toSerializable' in serializable) {
      return (serializable as WithSerializable).toSerializable() as Json;
    }
    return dictToJson(serializable);
  }

  throw new ArgumentException('Unknown seriasable', serializable);
}
