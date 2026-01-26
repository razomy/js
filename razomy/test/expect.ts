/**
 * Checks if a thrown error matches the expected criteria.
 */
export function matchesError(thrownError: unknown, expected?: Error | RegExp): boolean {
  const message = thrownError instanceof Error ? thrownError.message : String(thrownError);

  if (expected instanceof RegExp) {
    return expected.test(message);
  }
  if (expected instanceof Error) {
    return message === expected.message;
  }
  return message.includes(expected as any);
}

/**
 * Throws an Error if actual does not deep equal expected.
 */
export function assertDeepEqual<T>(actual: T, expected: T): void {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);

  if (actualStr !== expectedStr) {
    throw new Error(`\nAssertion Failed:\nExpected: ${expectedStr}\nReceived: ${actualStr}`);
  }
}

export function toStrictEqual<T>(actual: T, expected: T) {
  assertDeepEqual(actual, expected);
  console.log(`✅ expect(${JSON.stringify(expected)}).toStrictEqual passed`);
}

// 2. Synchronous Error
export function toThrow<T extends Function>(actual: T, expected?: Error) {
  let threw = false;
  let result = undefined;
  try {
    result = actual();
  } catch (err) {
    threw = true;
    if (!matchesError(err, expected)) {
      throw new Error(`Assertion Failed: ${err}\ndid not match: ${expected}`);
    }
  }

  if (!threw) {
    throw new Error(`Assertion Failed: Function expected to throw, but it did not. With result: ${JSON.stringify(result)}.`);
  }
  console.log(`✅ expect(${JSON.stringify(expected?.message)}).toThrow passed`);
}