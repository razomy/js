import type {Pipe} from '@razomy/pipes';

export interface WithPipes<T> {
  pipes: Pipe<T, T>[];
}

