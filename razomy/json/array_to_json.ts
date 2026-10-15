import * as json from '@razomy/json';
import * as abstractions from "@razomy/abstractions";

export function arrayToJson(data: abstractions.patterns.Serializable[]): abstractions.patterns.Json {
  return data.map(json.toJson);
}
