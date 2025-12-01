import {Exception} from "razomy.js/exceptions/exception";

export class PathException extends Exception {
  constructor(public path: string) {
    super("PathException", "Path error");
  }
}