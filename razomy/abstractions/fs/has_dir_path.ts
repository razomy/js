import * as abstractions from "@razomy/abstractions";
export type FileName<T = string> = abstractions.components.Path<T>;
export type FileContent<T = string> = abstractions.components.Path<T>;
export type FileExtension<T = string> = abstractions.components.Path<T>;

export type FilePath<T = string> = abstractions.components.Path<T>;
export type DirPath<T = string> = abstractions.components.Path<T>;

export interface HasDirPath extends abstractions.patterns.IComponent {
  dirPath: DirPath;
}

export interface HasFilePath extends abstractions.patterns.IComponent {
  filePath: FilePath;
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

export interface HasFileName extends abstractions.patterns.IComponent {
  fileName: string;
}

