import {is_vrd, Vrd, VrdOrValue} from "razomy/vrd/vrd";

function order_vrd<T, T2>(a: VrdOrValue<T>, b: VrdOrValue<T2>): VrdOrValue<T2> {
  if (is_vrd(a) && is_vrd(b)) {
    const order_b = new Vrd<T2>({});
    for (let key in a) {
      if (b[key] !== undefined) {
        order_b[key] = order_vrd(a[key], b[key]);
        delete b[key];
      }
    }

    for (let key in b) {
      order_b[key] = b[key];
    }

    return order_b;
  }

  return b;
}

export default order_vrd;
