import * as pipes from "@razomy/pipes";

export interface WithPipes<T> {
  pipes: pipes.Pipe<T, T>[];
}
