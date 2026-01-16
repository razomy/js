import {ArgumentException} from 'razomy.exceptions/argument_exception';

export class UnknownTypeArgumentException<T> extends ArgumentException<T> {
  constructor(type: T) {
    super("UnknownTypeArgumentException", type);
  }
}