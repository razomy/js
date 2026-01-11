import {BoundX, WithX} from "razomy/coordinates/x/x";

export interface WithY extends WithX {
  y: number;
}

export interface BoundY extends BoundX{
  start_y: number;
  finish_y: number;
}
