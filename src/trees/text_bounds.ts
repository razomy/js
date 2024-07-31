export interface Bounds {
  startX: number;
  startY: number;
  finishX: number;
  finishY: number;
}

export interface Offset {
  offset: number;
  size: number;
}

export interface NodeBound {
  fullRect: Bounds & Offset;
}

export function getPlacesBetweenNodes(nodes: NodeBound[], root: NodeBound) {
  if (nodes.length === 0) {
    return [{ startY: root.fullRect.startY, finishY: root.fullRect.finishY }];
  }

  const places: Bounds[] = [];

  // Add starting place
  const firstNode = nodes[0];
  if (firstNode.fullRect.startY > root.fullRect.startY) {
    places.push({
      startY: root.fullRect.startY,
      finishY: firstNode.fullRect.startY - 1,
      finishX: 0,
      startX: 0,
    });
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    const currentNode = nodes[i];
    const nextNode = nodes[i + 1];
    const place = {
      startY: currentNode.fullRect.finishY,
      finishY: nextNode.fullRect.startY - 1,
      finishX: 0,
      startX: 0,
    };

    if (place.startY < place.finishY
      && place.startY > root.fullRect.startY
      && place.finishY < root.fullRect.finishY) {
      places.push(place);
    }
  }

  // Add finishing place
  const lastNode = nodes[nodes.length - 1];
  if (lastNode.fullRect.finishY <= root.fullRect.finishY) {
    places.push({
      startY: lastNode.fullRect.finishY + 1,
      finishY: root.fullRect.finishY,
      finishX: 0,
      startX: 0,
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


export function getRect(delta: string, str: string): Bounds & Offset {
  const start = getStart(delta);
  const end = getStart(str);
  return {
    offset: delta.length,
    size: str.length,
    finishX: start.x + end.x,
    finishY: start.y + end.y,
    startY: start.y,
    startX: start.x,

  };
}
