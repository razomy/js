export function booleanUndefined(value: boolean | undefined): boolean {
  if (value === undefined) {
    return true;
  }
  return value;
}


