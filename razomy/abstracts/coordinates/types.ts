export interface HasLength {
  length: number;
}

export interface BoundRectangle extends BoundX, BoundY {}

export interface HasRectangle extends HasX, HasY {}

export interface BoundX {
  startX: number;
  finishX: number;
}

export interface HasX {
  x: number;
}

export interface BoundY {
  startY: number;
  finishY: number;
}

export interface HasY {
  y: number;
}

export interface NodeBound {
  fullRect: BoundY & HasX;
}

