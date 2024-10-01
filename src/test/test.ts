import {Function} from "razomy.js/function/function";

export async function test<I extends Array<any>, O>(cb: Function<I, O>, req: I, res: O | null = null, err: Error | null = null) {
  const resultFn = async () => await cb(...req);
  if (err != null) {
    expect(resultFn).toThrowError(err);
    return;
  }
  const result = await resultFn();
  if (res != null) {
    expect(result).toStrictEqual(res);
  }
}
