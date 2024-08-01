type Execute<I extends Array<any>, O> = (...req: I) => O

export async function execute_text<I extends Array<any>, O>(cb: Execute<I, O>, req: I, res: O | null = null, err: Error | null = null) {
  const resultFn = async () => await cb(...req);
  if (res != null) {
    expect(await resultFn()).toStrictEqual(res);
  } else if (err != null) {
    expect(resultFn).toThrowError(err);
  }
}

export interface Test<I extends Array<any>, O> {
  input: I,
  otput: O,
  error?: Error,
}

export function texts<I extends Array<any>, O>(cb: Execute<I, O>, array: Test<I, O>[]) {
  for (let key in array) {
    const test = array[key];
    it(key, async () => await execute_text(cb, test.input, test.otput, test.error));
  }
}
