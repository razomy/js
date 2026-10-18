import * as exceptions from '@razomy/exceptions';

export class UnknownTypeArgumentException<T> extends exceptions.ArgumentException<T> {
  constructor(type: T) {
    super('UnknownTypeArgumentException', type);
  }
}
