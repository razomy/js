import * as pipes from '@razomy/pipes';

export interface HasPipes<T> {
  pipes: pipes.Pipe<T, T>[];
}
