type Execute<I, O> = (req: I) => O

export function execute_text<I, O>(cb: Execute<I, O>, req: I, res: O) {
  const resultFn = () => cb(req);
  const result = resultFn();
  if (res != null) {
    expect(result).toStrictEqual(res);
  }
}

export interface Test<I, O> {
  input: I,
  utput: O
}

export function texts<I, O>(cb: Execute<I, O>, array: Test<I, O>[]) {
  for (let key in array) {
    const test = array[key];
    it(key, () => execute_text(cb, test.input, test.utput));
  }
}