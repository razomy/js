export interface HasLength {
  length: number;
}

export interface HasX {
  x: number;
}

export interface HasY {
  y: number;
}

export interface BoundX {
  startX: number;
  finishX: number;
}

export interface BoundY {
  startY: number;
  finishY: number;
}

export interface Position2d extends HasX, HasY {}

export interface BoundRectangle extends BoundX, BoundY {}


export interface NodeBound {
  fullRect: BoundY & HasX;
}

