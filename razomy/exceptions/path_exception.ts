import {ArgumentException} from '@razomy/exceptions';

export class PathException extends ArgumentException<{ path: string }> {
  constructor(public path: string) {
    super('PathException', {path});
  }
}