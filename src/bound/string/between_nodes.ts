import {NodeBound} from 'razomy.bound/string/bound';
import {rectangle} from 'razomy.coordinates';

export function between_nodes(nodes: NodeBound[], root: NodeBound) {
  if (nodes.length === 0) {
    return [{start_y: root.full_rect.start_y, finish_y: root.full_rect.finish_y}];
  }

  const places: rectangle.Bound[] = [];

  // Add starting place
  const first_node = nodes[0];
  if (first_node.full_rect.start_y > root.full_rect.start_y) {
    places.push({
      start_y: root.full_rect.start_y,
      finish_y: first_node.full_rect.start_y - 1,
      finish_x: 0,
      start_x: 0,
    });
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    const current_node = nodes[i];
    const next_node = nodes[i + 1];
    const place = {
      start_y: current_node.full_rect.finish_y,
      finish_y: next_node.full_rect.start_y - 1,
      finish_x: 0,
      start_x: 0,
    };

    if (place.start_y < place.finish_y
      && place.start_y > root.full_rect.start_y
      && place.finish_y < root.full_rect.finish_y) {
      places.push(place);
    }
  }

  // Add finishing place
  const last_node = nodes[nodes.length - 1];
  if (last_node.full_rect.finish_y <= root.full_rect.finish_y) {
    places.push({
      start_y: last_node.full_rect.finish_y + 1,
      finish_y: root.full_rect.finish_y,
      finish_x: 0,
      start_x: 0,
    });
  }

  return places;
}

export default between_nodes;
