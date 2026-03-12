import * as kv from "@razomy/kv";

export type Slug = kv.Key<string>;
export type AbsolutePathString = Slug;
export type RelativePathString = Slug;
export type PathString = AbsolutePathString | RelativePathString;
export type FilePathString = PathString;
export type DirPathString = PathString;
export type SourcePathString = DirPathString;

export interface WithPathString {
  pathString: PathString;
}
