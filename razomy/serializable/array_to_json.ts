import {toJson} from './to_json';
import {Serializable} from './serializable';
import {Json} from '@razomy/json';

export function arrayToJson(data: Serializable[]): Json {
  return data.map(toJson);
}
