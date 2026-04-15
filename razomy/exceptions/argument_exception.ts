import * as exceptions from '@razomy/exceptions';

export class ArgumentException<T> extends exceptions.AException {
  public arguments_: T;

  constructor(message: string, arguments_: T) {
    super(message);
    this.arguments_ = arguments_;
  }
}
