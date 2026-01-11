import {ArgumentException} from 'razomy/exceptions/argument_exception';

export class PathException extends ArgumentException<{ path: string }> {
  constructor(public path: string) {
    super('PathException', {path});
  }
}