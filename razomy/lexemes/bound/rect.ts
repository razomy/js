import * as boundString from './index';
import * as coordinates from '@razomy/coordinates';
import * as abstracts from "@razomy/abstracts";

export function rect(
  delta: string,
  str: string,
): abstracts.arrays.WithOffset & coordinates.length.WithLength & coordinates.rectangle.BoundRectangle {
  const start = boundString.size(delta);
  const end = boundString.size(str);
  return {
    offset: delta.length,
    length: str.length,
    finishX: start.x + end.x,
    finishY: start.y + end.y,
    startY: start.y,
    startX: start.x,
  };
}
