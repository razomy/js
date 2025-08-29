export class Exception extends Error {
  constructor(public message: string, public args: unknown) {
    super();
  }

  toString() {
    return this.message;
  }
}
