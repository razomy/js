import {to_serializable_type} from './to_serializable_type';
import {Serializable} from './serializable';

export function ctx_serializables(data: any[]): Serializable[] {
    return data.map(to_serializable_type).filter(s => s !== undefined) as Serializable[];
}
