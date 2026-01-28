import {matchesError} from './matches_error';

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
