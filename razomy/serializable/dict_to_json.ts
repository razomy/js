import * as json from '@razomy/json';
import * as serializable from '@razomy/serializable';

export function dictToJson(ctx: { [key: string]: serializable.Serializable }): json.Json {
  const result = {};
  for (const [k, v] of Object.entries(ctx)) {
    const s = serializable.toJson(v);
    result[k] = s;
  }
  return result;
}
