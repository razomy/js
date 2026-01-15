import {ctx_serializable} from './ctx_serializable';

import {ctx_serializables} from './ctx_serializables';
import {WithSerializable} from 'razomy.serializable/with_serializable';
import {Serializable} from 'razomy.serializable/serializable';

export function to_serializable_type(value: any): Serializable | undefined {
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
    return value;
    } else if (Array.isArray(value)) {
    return ctx_serializables(value);
    } else if (typeof value === 'object') {
    if ('toSerializable' in value) {
      return (value as WithSerializable<Serializable>).toSerializable();
    }
    return ctx_serializable(value);
    }

    return undefined;
}
