import { IFactory } from '../../../../../interfaces/i-factory.js';
import { ElementView } from '../../../../graphics/elements/element-view.js';
import { RectangleShape } from '../../../../graphics/elements/shapes/rectangle-shape.js';
import { TextElement } from '../../../../graphics/elements/text-element.js';
import { ViewportElement } from '../../../../graphics/elements/viewport-element.js';
import { RectangleRender } from './RectangleRender.js';
import { WebCanvasHighLightsRender } from './WebCanvasHighLightsRender.js';
import IRender from '../../../../renderes/i-render.js';
import Render from '../../../../renderes/render.js';
import NotSupportedException from '../../../../../exceptions/context-error.js';


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
