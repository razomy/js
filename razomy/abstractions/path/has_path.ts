import * as abstractions from '@razomy/abstractions';

export type Slug<T = string> = T;
export type AbsolutePath<T = string> = Slug<T>;
export type RelativePath<T = string> = Slug<T>;
export type Path<T = string> = AbsolutePath<T> | RelativePath<T>;
export type SourcePath<T = string> = Path<T>;

export interface HasPath extends abstractions.patterns.IComponent {
  path: Path;
}

export interface HasSlug extends abstractions.patterns.IComponent {
  slug: Slug;
}

export interface HasSourcePath extends abstractions.patterns.IComponent {
  sourcePath: SourcePath;
}

