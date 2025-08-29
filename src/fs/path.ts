import {Key} from "razomy.js/kv/kv";

export type Slug = Key<string>;
export type Path = Slug;
export type FilePath = Path;
export type DirPath = Path;
export type SourcePath = DirPath;

export interface WithPath {
  path: Path
}
