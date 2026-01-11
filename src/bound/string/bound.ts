import {BoundY} from "razomy/coordinates/y/y";
import {WithLength} from "razomy/coordinates/x/x";
import {WithOffset} from "razomy/offset/offest";


export interface NodeBound {
  fullRect: BoundY & WithOffset & WithLength;
}

export function getPlacesBetweenNodes(nodes: NodeBound[], root: NodeBound) {
  if (nodes.length === 0) {
    return [{ start_y: root.fullRect.start_y, finish_y: root.fullRect.finish_y }];
  }

  const places: BoundY[] = [];

  // Add starting place
  const firstNode = nodes[0];
  if (firstNode.fullRect.start_y > root.fullRect.start_y) {
    places.push({
      start_y: root.fullRect.start_y,
      finish_y: firstNode.fullRect.start_y - 1,
      finish_x: 0,
      start_x: 0,
    });
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    const currentNode = nodes[i];
    const nextNode = nodes[i + 1];
    const place = {
      start_y: currentNode.fullRect.finish_y,
      finish_y: nextNode.fullRect.start_y - 1,
      finish_x: 0,
      start_x: 0,
    };

    if (place.start_y < place.finish_y
      && place.start_y > root.fullRect.start_y
      && place.finish_y < root.fullRect.finish_y) {
      places.push(place);
    }
  }

  // Add finishing place
  const lastNode = nodes[nodes.length - 1];
  if (lastNode.fullRect.finish_y <= root.fullRect.finish_y) {
    places.push({
      start_y: lastNode.fullRect.finish_y + 1,
      finish_y: root.fullRect.finish_y,
      finish_x: 0,
      start_x: 0,
    });
  }

  return places;
}

export function getStart(str: string): { x: number, y: number } {
  let i = 0;
  let x = 0;
  let y = 0;

  loop: while (i < str.length) {
    const char = str[i];


    switch (char) {
      case '\n':
        y++;
        x = -1;
        break;
    }
    x++;
    i++;
  }

  return { x, y };
}


export function getRect(delta: string, str: string): BoundY & WithOffset & WithLength {
  const start = getStart(delta);
  const end = getStart(str);
  return {
    offset: delta.length,
    length: str.length,
    finish_x: start.x + end.x,
    finish_y: start.y + end.y,
    start_y: start.y,
    start_x: start.x,
  };
}
