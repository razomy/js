import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export class UnknownTypeArgumentException extends ArgumentException {
  constructor(arg: any) {
    super("UnknownTypeArgumentException", arg);
    this.name = "UnknownTypeArgumentException";
  }
}