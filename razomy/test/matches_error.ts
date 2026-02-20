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
