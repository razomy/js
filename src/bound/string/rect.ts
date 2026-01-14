import {WithOffset} from 'razomy.offset/offest';

import size from 'razomy.bound/string/size';
import * as coordinates from 'razomy.coordinates';

export default function rect(delta: string, str: string): WithOffset & coordinates.length.With & coordinates.rectangle.Bound {
  const start = size(delta);
  const end = size(str);
  return {
    offset: delta.length,
    length: str.length,
    finish_x: start.x + end.x,
    finish_y: start.y + end.y,
    start_y: start.y,
    start_x: start.x,
  };
}


