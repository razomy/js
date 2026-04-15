import * as vrd_ from "@razomy/vrd";

export function vrdToPath(vrd: vrd_.VrdOrValue<string | null>): string[] {
  if (vrd_.isVrd(vrd)) {
    const key = Object.keys(vrd)[0];
    if (!key) {
      return [];
    }
    return [key, ...vrdToPath(vrd[key])];
  }
  if (!vrd) {
    return [];
  }
  return [vrd];
}
