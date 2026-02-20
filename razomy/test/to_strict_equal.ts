import {assertDeepEqual} from './assert_deep_equal';

export function toStrictEqual<T>(actual: T, expected: T) {
  assertDeepEqual(actual, expected);
  console.log(`✅ expect(${JSON.stringify(expected)}).toStrictEqual passed`);
}
