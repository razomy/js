import type { WithOffset } from '@razomy/offset';

import { size } from '@razomy/bound-string';
import type { length, rectangle } from '@razomy/coordinates';

export function rect(delta: string, str: string): WithOffset & length.WithLength & rectangle.BoundRectangle {
  const start = size(delta);
  const end = size(str);
  return {
    offset: delta.length,
    length: str.length,
    finishX: start.x + end.x,
    finishY: start.y + end.y,
    startY: start.y,
    startX: start.x,
  };
}
