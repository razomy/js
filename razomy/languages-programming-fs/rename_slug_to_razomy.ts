import * as path from 'path';
import { razomyOutput } from './is_output';
import * as abstracts from "@razomy/abstracts";
import * as fs from "@razomy/fs";

export function renameSlugToRazomy(path_: abstracts.graphs.PathString) {
  const dir = path.dirname(path_);
  const res = path.join(dir, razomyOutput[0]);
  fs.rename(path_, res);
}
