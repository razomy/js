import type {Json} from '@razomy/json';
import {toJson} from './to_json';
import type {Serializable} from '@razomy/serializable';

export function dictToJson(ctx: { [key: string]: Serializable }): Json {
  const result = {};
  for (const [k, v] of Object.entries(ctx)) {
    const s = toJson(v);
    result[k] = s;
  }
  return result;
}
