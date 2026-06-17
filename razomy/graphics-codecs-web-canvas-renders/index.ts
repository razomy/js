// Imports
import { CanvasRectangle, RenderFactory, TextRender, ViewportRender, WebCanvasRender } from './viewport_render';
import { WebCanvasHighLightsRender } from './web_canvas_high_lights_render';

// Named exports
export {
  CanvasRectangle,
  RenderFactory,
  TextRender,
  ViewportRender,
  WebCanvasHighLightsRender,
  WebCanvasRender
};

// Default export
const graphicsCodecsWebCanvasRenders = {
  CanvasRectangle,
  RenderFactory,
  TextRender,
  ViewportRender,
  WebCanvasRender,
  WebCanvasHighLightsRender,
};

export default graphicsCodecsWebCanvasRenders;
