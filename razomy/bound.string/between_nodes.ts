import {NodeBound} from './node_bound';
import * as rectangle from 'razomy.coordinates.rectangle';

export function betweenNodes(nodes: NodeBound[], root: NodeBound) {
  if (nodes.length === 0) {
    return [{start_y: root.fullRect.startY, finish_y: root.fullRect.finishY}];
  }

  const places: rectangle.BoundRectangle[] = [];

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


