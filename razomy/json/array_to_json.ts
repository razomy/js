import * as json from '@razomy/json';
import * as abstracts from "@razomy/abstracts";

export function arrayToJson(data: abstracts.patterns.Serializable[]): abstracts.patterns.Json {
  return data.map(json.toJson);
}
