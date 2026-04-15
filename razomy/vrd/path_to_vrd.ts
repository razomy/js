import * as vrd from "@razomy/vrd";

export function pathToVrd(path: string[]) {
  const root = new vrd.Vrd<null>();

  let last: vrd.VrdOrValue<null> = root;
  for (let i = 0; i < path.length - 1; i++) {
    const string = path[i];
    last[string] = new vrd.Vrd();
    last = last[string];
  }
  last[path[path.length - 1]] = null;
  return root;
}
