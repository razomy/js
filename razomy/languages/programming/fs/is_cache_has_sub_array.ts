import {subHas} from 'razomy.array/sub_has';

export function isCacheHasSubArray(master: string[], sub: string | string[]): boolean {
  if (Array.isArray(sub)) {
    return subHas(master, sub)

  }

  return master.includes(sub)
}
