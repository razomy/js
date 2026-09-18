import * as abstracts from '@razomy/abstracts';

export type Slug = string;
export type AbsolutePathString = Slug;
export type RelativePathString = Slug;
export type PathString = AbsolutePathString | RelativePathString;

export type FilePathString = PathString;
export type DirPathString = PathString;
export type SourcePathString = DirPathString;

export interface HasPath extends abstracts.meta.IHas {
  path: string;
}

export interface HasSlug extends abstracts.meta.IHas {
  slug: string;
}

export interface HasDirPath extends abstracts.meta.IHas {
  dirPath: string;
}

export interface HasFileName extends abstracts.meta.IHas {
  fileName: string;
}

export interface HasFilePath extends abstracts.meta.IHas {
  filePath: string;
}

export interface HasSourcePath extends abstracts.meta.IHas {
  sourcePath: string;
}
