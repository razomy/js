import * as abstracts from '@razomy/abstracts';

export type Slug = string;
export type AbsolutePathString = Slug;
export type RelativePathString = Slug;
export type PathString = AbsolutePathString | RelativePathString;
export type Url = string;

export type FilePathString = PathString;
export type DirPathString = PathString;
export type SourcePathString = DirPathString;

export interface HasPath extends abstracts.patterns.IComponent {
  path: string;
}

export interface HasSlug extends abstracts.patterns.IComponent {
  slug: string;
}

export interface HasDirPath extends abstracts.patterns.IComponent {
  dirPath: string;
}

export interface HasFileName extends abstracts.patterns.IComponent {
  fileName: string;
}

export interface HasFilePath extends abstracts.patterns.IComponent {
  filePath: string;
}

export interface HasSourcePath extends abstracts.patterns.IComponent {
  sourcePath: string;
}


export interface HasStartDir extends abstracts.patterns.IComponent {
  startDir: string;
}

export interface HasCurrentDir extends abstracts.patterns.IComponent {
  currentDir: string;
}

export interface HasSourceDir extends abstracts.patterns.IComponent {
  sourceDir: string;
}
