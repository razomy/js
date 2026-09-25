import * as abstracts from "@razomy/abstracts";

export function jsonToString(state: abstracts.domains.Json): string {
  return JSON.stringify(state, null, 2);
}
