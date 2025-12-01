import {Exception} from "razomy.js/exceptions/exception";

export class MultipleException extends Exception {
  public exceptions: Exception[];

  constructor(exceptions: Exception[]) {
    super("MultipleException", " Merge execeptions");
    this.exceptions = exceptions;
  }
}