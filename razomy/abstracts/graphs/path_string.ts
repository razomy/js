import type {IHas} from "@razomy/abstracts/meta";

export type Slug = string;
export type AbsolutePathString = Slug;
export type RelativePathString = Slug;
export type PathString = AbsolutePathString | RelativePathString;

export type FilePathString = PathString;
export type DirPathString = PathString;
export type SourcePathString = DirPathString;

export interface HasPathString  extends IHas{
  pathString: PathString;
}

export interface HasDirPath extends IHas {
  dirPath: string;
}

export interface HasFileName extends IHas {
  fileName: string;
}

export interface HasFilePath extends IHas {
  filePath: string;
}

export interface HasSourcePath extends IHas {
  sourcePath: string;
}
