import ctx_serializable from './ctx_serializable';
import {ISerializable, Serializable} from './serializable2';
import ctx_serializables from './ctx_serializables';

export default function to_serializable_type(value: any): Serializable | undefined {
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
    return value;
    } else if (Array.isArray(value)) {
    return ctx_serializables(value);
    } else if (typeof value === 'object') {
    if ('toSerializable' in value) {
      return (value as ISerializable).toSerializable();
    }
    return ctx_serializable(value);
    }

    return undefined;
}
