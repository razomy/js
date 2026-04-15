import * as vrd from "@razomy/vrd";

export function isVrd<T>(obj: vrd.VrdOrValue<T>): obj is vrd.Vrd<T> {
  return obj instanceof vrd.Vrd;
}
