import {WithOffset} from 'razomy.offset/offest';

import {size} from 'razomy.bound/string/size';
import * as coordinates from 'razomy.coordinates';

export function rect(delta: string, str: string): WithOffset & coordinates.length.WithLength & coordinates.rectangle.BoundRectangle {
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


