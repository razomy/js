import {dict_to_json} from './dict_to_json';

import {array_to_json} from './array_to_json';
import {WithSerializable} from 'razomy.serializable/with_serializable';
import {Serializable} from 'razomy.serializable/serializable';
import {Json} from 'razomy.json';
import {ArgumentException} from 'razomy.exceptions';

export function to_json(serializable: Serializable): Json {
  if (serializable === null) {
    return serializable;
  } else if (['string', 'number', 'boolean'].includes(typeof serializable)) {
    return serializable as Json;
  }
  if (Array.isArray(serializable)) {
    return array_to_json(serializable) as Json;
  } else if (typeof serializable === 'object') {
    if ('toSerializable' in serializable) {
      return (serializable as WithSerializable).toSerializable() as Json;
    }
    return dict_to_json(serializable);
  }

  throw new ArgumentException('Unknown seriasable', serializable);
}
