import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export class UnknownTypeArgumentException extends ArgumentException {
  constructor(arg: any) {
    super('Unknown argument type', arg);
  }
}