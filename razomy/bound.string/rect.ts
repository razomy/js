import {WithOffset} from 'razomy.offset';

import {size} from 'razomy.bound.string';
import * as rectangle from 'razomy.coordinates.rectangle';
import * as length from 'razomy.coordinates.length';

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


