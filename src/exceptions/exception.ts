export class Exception<T = unknown> extends Error {
  constructor(public message: string, public context: T) {
    super();
  }

  toString() {
    return this.message;
  }
}
