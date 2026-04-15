import * as exceptions from "@razomy/exceptions";

export class NotImplementedException extends exceptions.Exception {
  constructor() {
    super('Code under construction.');
  }
}
