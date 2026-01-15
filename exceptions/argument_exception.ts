import {Exception} from 'razomy.exceptions/exception';

export class ArgumentException<T> extends Exception {
  public arguments_: T;

  constructor(message: string, arguments_: T) {
    super(message);
    this.arguments_ = arguments_;
  }
}
