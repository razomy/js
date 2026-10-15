import * as abstractions from '@razomy/abstractions';

export type Slug = string;
export type AbsolutePathString = Slug;
export type RelativePathString = Slug;
export type PathString = AbsolutePathString | RelativePathString;
export type Url = string;

export type FilePathString = PathString;
export type DirPathString = PathString;
export type SourcePathString = DirPathString;

export interface HasPath extends abstractions.patterns.IComponent {
  path: string;
}

export interface HasSlug extends abstractions.patterns.IComponent {
  slug: string;
}

export interface HasDirPath extends abstractions.patterns.IComponent {
  dirPath: string;
}

export interface HasFileName extends abstractions.patterns.IComponent {
  fileName: string;
}

export interface HasFilePath extends abstractions.patterns.IComponent {
  filePath: string;
}

export interface HasSourcePath extends abstractions.patterns.IComponent {
  sourcePath: string;
}


export interface HasStartDir extends abstractions.patterns.IComponent {
  startDir: string;
}

export interface HasCurrentDir extends abstractions.patterns.IComponent {
  currentDir: string;
}

export interface HasSourceDir extends abstractions.patterns.IComponent {
  sourceDir: string;
}
