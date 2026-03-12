import * as array from "@razomy/array";

export function isCacheHasSubArray(master: string[], sub: string | string[]): boolean {
  if (Array.isArray(sub)) {
    return array.hasArray(master, sub);
  }

  return master.includes(sub);
}
