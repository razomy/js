import * as abstractions from "@razomy/abstractions";

export function stringToJson<T extends abstractions.patterns.Json>(data: string): T {
  return JSON.parse(data);
}
