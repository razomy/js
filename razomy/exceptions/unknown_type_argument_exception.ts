import {ArgumentException} from '@razomy/exceptions';

export class UnknownTypeArgumentException<T> extends ArgumentException<T> {
  constructor(type: T) {
    super('UnknownTypeArgumentException', type);
  }
}