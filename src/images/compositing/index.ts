// Imports
import { blend } from './blend';
import { composite } from './composite';
import { drawCircle } from './draw_circle';
import { drawLine } from './draw_line';
import { drawRectangle } from './draw_rectangle';
import { join } from './join';

// Named exports
export {
  blend,
  composite,
  drawCircle,
  drawLine,
  drawRectangle,
  join
};

// Default export
const compositing = {
  blend,
  composite,
  drawCircle,
  drawLine,
  drawRectangle,
  join,
};

export default compositing;
