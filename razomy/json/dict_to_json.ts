import * as json from '@razomy/json';
import * as abstracts from "@razomy/abstracts";

export function dictToJson(ctx: { [key: string]: abstracts.patterns.Serializable }): abstracts.patterns.Json {
  const result = {};
  for (const [k, v] of Object.entries(ctx)) {
    const s = json.toJson(v);
    result[k] = s;
  }
  return result;
}
