export class ArgumentError {
  constructor(public value: any) {}
}

export function not_empty(value) {
  if (value === null || value === undefined || value === "") {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}

export function false_throw(value) {
  if (value == false) {
    throw new ArgumentError(value);
  }
  return true;
}

export function empty_throw(value) {
  if (!not_empty(value)) {
    throw new ArgumentError(value);
  }
  return true;
}

export function not_zero(value) {
  return value !== 0;
}

export function and(...value: boolean[]) {
  return value.reduce((acc, cur) => acc && cur, true);
}

export function and_false_throw(...value: boolean[]) {
  if (!and(...value)) {
    throw new ArgumentError(value);
  }
  return true;
}
