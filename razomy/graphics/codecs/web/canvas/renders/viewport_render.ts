import { WebCanvasHighLightsRender }  from 'razomy.graphics/codecs/web/canvas/renders/web_canvas_high_lights_render';
import {IRender} from 'razomy.graphics/renderes/i_render';
import {Render} from 'razomy.graphics/renderes/render';
import {TextElement} from 'razomy.graphics/elements/text_element';
import {ViewportElement} from 'razomy.graphics/elements/viewport_element';
import {ElementView} from 'razomy.graphics/elements/element_view';
import {RectangleShape} from 'razomy.graphics/shapes/rectangle_shape';
import {NotSupportedException} from 'razomy.exceptions/not_supported_exception';
import {RectangleRender} from 'razomy.graphics/shapes/rectangle_render';
import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {UnknownTypeArgumentException} from 'razomy.exceptions/unknown_type_argument_exception';
import * as create from 'razomy.create';


export class ViewportRender {
  constructor(
    private ctx: CanvasRenderingContext2D
  ) {
  }

  render(node: ViewportElement): void {
  }
}

export class TextRender {
  constructor(
    private ctx: CanvasRenderingContext2D
  ) {
  }

  render(node: TextElement): void {
  }
}

export class CanvasRectangle {
}

export class RenderFactory implements create.WithCreate<IRender<any>> {

  constructor(
    public ctx: CanvasRenderingContext2D
  ) {
  }

  public create(element?: ElementView): IRender<any> {
    if (element instanceof RectangleShape) {
      return new RectangleRender(this.ctx);
    } else if (element instanceof ViewportElement) {
      return new ViewportRender(this.ctx);
    } else if (element instanceof TextElement) {
      return new TextRender(this.ctx);
    }

    throw new UnknownTypeArgumentException('un');
  }
}


export class WebCanvasRender extends Render {
  constructor(
    public codecFactory: RenderFactory,
    public crx: CanvasRenderingContext2D,
    public webSvgHighLightsRender: WebCanvasHighLightsRender
  ) {
    super();
  }

  public render(view: ElementView): void {
    this.webSvgHighLightsRender.render(view);
    this.iterate(view);
  }

  private iterate(node: ElementView) {
    this.codecFactory.create(node).render(node);

    const node_children = node.children;
    for (let i = 0; i < node_children.length; i++) {
      if (!node_children[i]) {
        continue;
      }

      this.iterate(node_children[i]);
    }
  }
}
