import * as abstractions from "@razomy/abstractions";
import * as lexemes from "@razomy/lexemes";

export function rect(
  delta: string,
  str: string,
): abstractions.arrays.HasOffset & abstractions.components.HasLength & abstractions.components.BoundRectangle {
  const start = lexemes.bound.size(delta);
  const end = lexemes.bound.size(str);
  return {
    offset: delta.length,
    length: str.length,
    finishX: start.x + end.x,
    finishY: start.y + end.y,
    startY: start.y,
    startX: start.x,
  };
}
