import { Json } from 'razomy.json';
import {to_json} from './to_json';
import {Serializable} from 'razomy.serializable/serializable';

export function dict_to_json(ctx: { [key: string]: Serializable }): Json {
  const result = {};
  for (const [k, v] of Object.entries(ctx)) {
    const s = to_json(v);
    result[k] = s;
  }
  return result;
}
