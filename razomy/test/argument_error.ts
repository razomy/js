export class ArgumentError {
  constructor(public value: any) {
  }
}

export function notEmpty(value) {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}
