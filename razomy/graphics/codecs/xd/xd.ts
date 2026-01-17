
export interface Path {
  type: 'path';
  path: string;
}

export interface CompoundPath {
  type: 'compound';
  path: string;
  children: Artboard[];
}

export interface Rectangle {
  type: 'rect';
  x: number;
  y: number;
  r?: number[];
  width: number;
  height: number;
}

export interface Circle {
  type: 'circle';
  cx: number;
  cy: number;
  r: number;
}

export interface Ellipse {
  type: 'ellipse';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface Line {
  type: 'line';
  x_1: number;
  y_1: number;
  x_2: number;
  y_2: number;
}

export type Shape = Path | CompoundPath | Rectangle | Circle | Ellipse | Line;

export interface CommonArtboard {
  id?: string;
  name?: string;
  type?: string;
  artboard?: Artboard;
  visible?: boolean;
  style: { [style: string]: any };
  transform: { [transform: string]: any };
  children: Artboard[];
}

export interface ShapeArtboard extends CommonArtboard {
  type: 'shape';
  shape: Shape;
}

export interface TextArtboard extends CommonArtboard {
  type: 'text';
  text: Text;
}

export interface GroupArtboard extends CommonArtboard {
  type: 'group';
  group: Artboard;
}

export type Artboard = ShapeArtboard | TextArtboard | GroupArtboard;
