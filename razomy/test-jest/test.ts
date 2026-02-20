import type {Function} from '@razomy/function';

export async function test<I extends Array<any>, O>(
  cb: Function<I, O>,
  req: I,
  res: O | null = null, err: Error | null = null) {
  async function resultFn() {
    return await cb(...req);
  }

  if (res != null) {
    const result = await resultFn();
    expect(result).toStrictEqual(res);
  }

  if (err != null) {
    expect(resultFn).toThrow(err);
  }
}


