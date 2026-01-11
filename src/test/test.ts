import {Function} from "razomy/function/function";

export async function test<I extends Array<any>, O>(cb: Function<I, O>, req: I, res: O | null = null, err: Error | null = null) {
  const resultFn = async () => await cb(...req);
  if (err != null) {
    expect(resultFn).toThrow(err);
    return;
  }
  const result = await resultFn();
  if (res != null) {
    expect(result).toStrictEqual(res);
  }
}
