import * as exceptions from "@razomy/exceptions";

export class PathException extends exceptions.ArgumentException<{ path: string }> {
  constructor(public path: string) {
    super('PathException', { path });
  }
}
