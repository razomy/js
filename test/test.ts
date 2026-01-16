import {Function} from 'razomy.function';

export async function test<I extends Array<any>, O>(cb: Function<I, O>, req: I, res: O | null = null, err: Error | null = null) {
  async function result_fn () { return await cb(...req); }
  if (err != null) {
    expect(result_fn).toThrow(err);
    return;
  }
  const result = await result_fn();
  if (res != null) {
    expect(result).toStrictEqual(res);
  }
}


