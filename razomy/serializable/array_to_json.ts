import {to_json} from './to_json';
import {Serializable} from './serializable';
import {Json} from 'razomy.json';

export function array_to_json(data: Serializable[]): Json {
  return data.map(to_json);
}
