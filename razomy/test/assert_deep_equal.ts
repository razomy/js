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
