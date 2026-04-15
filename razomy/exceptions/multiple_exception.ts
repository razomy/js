import * as exceptions from "@razomy/exceptions";

export class MultipleException extends exceptions.Exception {
  public exceptions: exceptions.Exception[];

  constructor(exceptions: exceptions.Exception[]) {
    super('Merge exceptions');
    this.exceptions = exceptions;
  }
}
