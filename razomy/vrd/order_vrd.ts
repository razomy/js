import * as vrd from "@razomy/vrd";

export function orderVrd<T, T2>(a: vrd.VrdOrValue<T>, b: vrd.VrdOrValue<T2>): vrd.VrdOrValue<T2> {
  if (vrd.isVrd(a) && vrd.isVrd(b)) {
    const orderB = new vrd.Vrd<T2>({});
    for (const key in a) {
      if (b[key] !== undefined) {
        orderB[key] = orderVrd(a[key], b[key]);
        delete b[key];
      }
    }

    for (const key in b) {
      orderB[key] = b[key];
    }

    return orderB;
  }

  return b;
}
