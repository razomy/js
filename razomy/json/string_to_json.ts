import {Json} from '@razomy/json';

export function stringToJson<T extends Json>(data: string): T {
  return JSON.parse(data);
}
