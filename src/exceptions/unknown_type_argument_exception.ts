import {ArgumentException} from 'razomy.js/exceptions/argument_exception';

export class UnknownTypeArgumentException<T> extends ArgumentException<T> {
  constructor(type: T) {
    super("UnknownTypeArgumentException", type);
  }
}