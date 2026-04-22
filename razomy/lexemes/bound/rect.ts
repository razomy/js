import * as lexemesBound from '@razomy/lexemes/bound';
import * as coordinates from '@razomy/coordinates';
import * as abstracts from "@razomy/abstracts";

export function rect(
  delta: string,
  str: string,
): abstracts.arrays.WithOffset & coordinates.length.WithLength & coordinates.rectangle.BoundRectangle {
  const start = lexemesBound.size(delta);
  const end = lexemesBound.size(str);
  return {
    offset: delta.length,
    length: str.length,
    finishX: start.x + end.x,
    finishY: start.y + end.y,
    startY: start.y,
    startX: start.x,
  };
}
