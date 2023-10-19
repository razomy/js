import { IFactory } from '../../../../../Interfaces/IFactory.js';
import { ElementView } from '../../../../Graphics/Elements/ElementView.js';
import { RectangleShape } from '../../../../Graphics/Elements/Shapes/RectangleShape.js';
import { TextElement } from '../../../../Graphics/Elements/TextElement.js';
import { ViewportElement } from '../../../../Graphics/Elements/ViewportElement.js';
import { RectangleRender } from './RectangleRender.js';
import { WebCanvasHighLightsRender } from './WebCanvasHighLightsRender.js';
import IRender from '../../../../../GUI/Renderes/IRender.js';
import Render from '../../../../../GUI/Renderes/Render.js';
import NotSupportedException from '../../../../../Exceptions/ContextError.js';


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
