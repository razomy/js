import {ArgumentException} from './argument_exception';

export class PathException extends ArgumentException<{ path: string }> {
  constructor(public path: string) {
    super('PathException', {path});
  }
}