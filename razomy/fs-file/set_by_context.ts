import * as fsFile from "@razomy/fs-file";
import * as path from "path";

export interface FileContext {
  name: string;
  extension: string;
  folderPath: string;
  content: string;
}

export function setByContext(c: FileContext) {
    fsFile.setSync(path.join(c.folderPath, fsFile.name(c.name, c.extension)), c.content);
}
