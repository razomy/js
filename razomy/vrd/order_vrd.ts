import { Vrd, type VrdOrValue } from './vrd';
import { isVrd } from './is_vrd';

export function orderVrd<T, T2>(a: VrdOrValue<T>, b: VrdOrValue<T2>): VrdOrValue<T2> {
  if (isVrd(a) && isVrd(b)) {
    const orderB = new Vrd<T2>({});
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
