import * as vrd from "@razomy/vrd";

export function getByPath<T>(valueRecursive: vrd.VrdOrValue<T>, path: string[]) {
  const pathed = vrd.pathToVrd(path);
  const node = vrd.getVrd(valueRecursive, path, 0);
  vrd.setVrd(pathed, path, node);
  return pathed;
}
