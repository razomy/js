import * as json from '@razomy/json';
import * as abstractions from "@razomy/abstractions";

export function dictToJson(ctx: { [key: string]: abstractions.patterns.Serializable }): abstractions.patterns.Json {
  const result = {};
  for (const [k, v] of Object.entries(ctx)) {
    const s = json.toJson(v);
    result[k] = s;
  }
  return result;
}
