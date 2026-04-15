import * as test from "@razomy/test";

export function toStrictEqual<T>(actual: T, expected: T) {
  test.assertDeepEqual(actual, expected);
  console.log(`✅ expect(${JSON.stringify(expected)}).toStrictEqual passed`);
}
