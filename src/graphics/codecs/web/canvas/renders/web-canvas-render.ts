import { WebCanvasHighLightsRender }  from 'razomy.js/graphics/codecs/web/canvas/renders/web-canvas-highlights-render';
import {IRender} from 'razomy.js/graphics/renderes/i-render';
import {Render} from 'razomy.js/graphics/renderes/render';
import {TextElement} from 'razomy.js/graphics/elements/text-element';
import {ViewportElement} from 'razomy.js/graphics/elements/viewport-element';
import {IFactory} from 'razomy.js/interfaces/i-factory';
import {ElementView} from 'razomy.js/graphics/elements/element-view';
import {RectangleShape} from 'razomy.js/graphics/shapes/rectangle-shape';
import {NotSupportedException} from 'razomy.js/exceptions/not-supported-exception';
import {RectangleRender} from 'razomy.js/graphics/shapes/rectangle-render';


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

export class RenderFactory implements IFactory<IRender<any>> {

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

    throw  new NotSupportedException();
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

    const nodeChildren = node.children;
    for (let i = 0; i < nodeChildren.length; i++) {
      if (!nodeChildren[i]) {
        continue;
      }

      this.iterate(nodeChildren[i]);
    }
  }
}
