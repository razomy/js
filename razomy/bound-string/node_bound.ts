import type { x, y } from '@razomy/coordinates';

export interface NodeBound {
  fullRect: y.BoundY & x.WithX;
}
