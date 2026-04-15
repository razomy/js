import * as json from '@razomy/json';
import * as serializable from "@razomy/serializable";

export function arrayToJson(data: serializable.Serializable[]): json.Json {
  return data.map(serializable.toJson);
}
