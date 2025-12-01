export class Exception extends Error {
  public name: string;
  public message: string;

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
  }

  toString() {
    return this.name + " " + this.message;
  }
}
