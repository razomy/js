import * as offset from "@razomy/offset";
import * as boundString from "@razomy/bound-string";
import * as coordinates from "@razomy/coordinates";

export function rect(delta: string, str: string): offset.WithOffset & coordinates.length.WithLength & coordinates.rectangle.BoundRectangle {
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
