function boolean_undefined(value: boolean | undefined): boolean {
  if (value === undefined) {
    return true;
  }
  return value;
}

export default boolean_undefined;
