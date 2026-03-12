import fs from 'fs';
import * as abstracts from "@razomy/abstracts";

export function appendSync(filePath: abstracts.graphs.FilePathString, content: string) {
  fs.appendFileSync(filePath, content, 'utf8');
}
