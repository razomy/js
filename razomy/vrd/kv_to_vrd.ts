import * as vrd from '@razomy/vrd';

export function kvToVrd<T>(arr: [key: string, value: vrd.VrdOrValue<T>, order?: number][]): vrd.Vrd<T> {
  const m = vrd.vrd<T>({});
  for (const [key, value] of arr) {
    m[key] = value;
  }
  return m;
}
