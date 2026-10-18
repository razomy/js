import * as exceptions from '@razomy/exceptions';

export class MultipleException extends exceptions.AException {
  public exceptions: exceptions.AException[];

  constructor(exceptions: exceptions.AException[]) {
    super('Merge exceptions');
    this.exceptions = exceptions;
  }
}
