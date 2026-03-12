import * as json from '@razomy/json';

export function stringToJson<T extends json.Json>(data: string): T {
  return JSON.parse(data);
}
