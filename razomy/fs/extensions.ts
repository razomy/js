import * as fs from "@razomy/fs";

declare global {
  interface String {
    toPath(): fs.Path;
    joinPath(...args:string[]): string;
  }
}

// 3. Attach toPath() to String.prototype
String.prototype.toPath = function (): fs.Path {
  return new fs.Path(this.toString());
};


String.prototype.joinPath = function (...args): string {
  return new fs.Path(this.toString()).join(...args).toString();
};
