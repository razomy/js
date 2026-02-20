import {toJson} from './to_json';
import type {Serializable} from './serializable';
import type {Json} from '@razomy/json';

export function arrayToJson(data: Serializable[]): Json {
  return data.map(toJson);
}
