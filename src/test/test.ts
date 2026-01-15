import {Function} from 'razomy.function/function';

export async function test<I extends Array<any>, O>(cb: Function<I, O>, req: I, res: O | null = null, err: Error | null = null) {
  const result_fn = async () => await cb(...req);
  if (err != null) {
    expect(result_fn).toThrow(err);
    return;
  }
  const result = await result_fn();
  if (res != null) {
    expect(result).toStrictEqual(res);
  }
}


