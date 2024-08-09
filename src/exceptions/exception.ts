export class Exception extends Error {
  constructor(message: string, args: unknown) {
    console.error(message, args);
    super();
  }

  toString() {
    return this.message;
  }
}
