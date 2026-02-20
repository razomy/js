import type {VrdOrValue} from './vrd';
import {isVrd} from './is_vrd';

export function vrdToPath(vrd: VrdOrValue<string | null>): string[] {
  if (isVrd(vrd)) {
    const key = Object.keys(vrd)[0];
    if (!key) {
      return []
    }
    return [key, ...vrdToPath(vrd[key])];
  }
  if (!vrd) {
    return []
  }
  return [vrd];
}
