import * as abstracts from "@razomy/abstracts";

export function stringToJson<T extends abstracts.patterns.Json>(data: string): T {
  return JSON.parse(data);
}
