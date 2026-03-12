import fs from 'fs';
import * as abstracts from "@razomy/abstracts";

export function getSync(filePath: abstracts.graphs.FilePathString) {
  return fs.readFileSync(filePath, 'utf8');
}
