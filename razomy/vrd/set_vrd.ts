import * as vrd from "@razomy/vrd";

export function setVrd<T>(root: vrd.VrdOrValue<T>, path: string[], newValue: vrd.VrdOrValue<T>): void {
  const parentPath = path.slice(0, -1);
  let parentNode: vrd.Vrd<T>;
  if (parentPath.length !== 0) {
    parentNode = vrd.getVrd(root, parentPath, 0) as vrd.Vrd<T>;
  } else {
    parentNode = root as vrd.Vrd<T>;
  }
  parentNode[path.at(-1)!] = newValue;
}
