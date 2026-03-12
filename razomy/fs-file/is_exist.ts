import fs from 'fs';
import * as abstracts from "@razomy/abstracts";

export function isExist(filePath: abstracts.graphs.SourcePathString) {
  return fs.existsSync(filePath);
}
