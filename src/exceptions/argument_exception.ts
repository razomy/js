import {Exception} from 'razomy.js/exceptions/exception';

export class ArgumentException<T = unknown> extends Exception {
  public arguments_: T;

  constructor(message: string, arguments_: T) {
    super("ArgumentException", message ?? "Invalid arguments");
    this.arguments_ = arguments_;
    this.arguments_ = arguments_;
  }
}

