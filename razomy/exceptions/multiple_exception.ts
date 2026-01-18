import {Exception} from 'razomy.exceptions';

export class MultipleException extends Exception {
  public exceptions: Exception[];

  constructor(exceptions: Exception[]) {
    super('Merge exceptions');
    this.exceptions = exceptions;
  }
}