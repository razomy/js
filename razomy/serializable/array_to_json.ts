import { toJson } from './to_json';
import type { Serializable } from './serializable';
import * as json from '@razomy/json';

export function arrayToJson(data: Serializable[]): json.Json {
  return data.map(toJson);
}
