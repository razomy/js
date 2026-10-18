// Imports
import { RectangleRender } from './rectangle_render';
import { RectangleRoundStyle } from './rectangle_round_style';
import { RectangleShape } from './rectangle_shape';
import type { IRectangleShape } from './rectangle_shape';
import { LineShape, PointShape, ShapeElement } from './shape_element';

// Named exports
export {
  LineShape,
  PointShape,
  RectangleRender,
  RectangleRoundStyle,
  RectangleShape,
  ShapeElement
};
export type {
  IRectangleShape
};

// Default export
const graphicsShapes = {
  RectangleRender,
  RectangleRoundStyle,
  RectangleShape,
  LineShape,
  PointShape,
  ShapeElement,
};


export default graphicsShapes;
