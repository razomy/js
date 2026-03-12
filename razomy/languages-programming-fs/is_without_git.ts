import { isWithGit } from './is_with_git';
import * as abstracts from "@razomy/abstracts";

export function isWithoutGit(path: abstracts.graphs.PathString) {
  return !isWithGit(path);
}
