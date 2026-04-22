import * as json from '@razomy/json';
import * as abstracts from "@razomy/abstracts";

export function arrayToJson(data: abstracts.domains.Serializable[]): json.Json {
  return data.map(json.toJson);
}
