import {Json} from 'razomy.json/json';

export function stringToJson<T extends Json>(data: string): T {
  return JSON.parse(data);
}
