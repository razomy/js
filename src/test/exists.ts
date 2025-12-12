export class ArgumentError {
  constructor(public value: any) {}
}

export function notEmpty(value) {
  if (value === null || value === undefined || value === "") {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}

export function falseThrow(value) {
  if (value == false) {
    throw new ArgumentError(value);
  }
  return true;
}

export function emptyThrow(value) {
  if (!notEmpty(value)) {
    throw new ArgumentError(value);
  }
  return true;
}

export function notZero(value) {
  return value !== 0;
}

export function and(...value: boolean[]) {
  return value.reduce((acc, cur) => acc && cur, true);
}

export function andFalseThrow(...value: boolean[]) {
  if (!and(...value)) {
    throw new ArgumentError(value);
  }
  return true;
}
