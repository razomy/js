import { IFactory } from '../../../../../Interfaces/IFactory';
import { ElementView } from '../../../../../GUI/Graphics/Elements/ElementView';
import { RectangleShape } from '../../../../../GUI/Graphics/Elements/Shapes/RectangleShape';
import { TextElement } from '../../../../../GUI/Graphics/Elements/TextElement';
import { ViewportElement } from '../../../../../GUI/Graphics/Elements/ViewportElement';
import { RectangleRender } from '../../../../../GUI/Platforms/Web/Canvas/Renders/RectangleRender';
import { WebCanvasHighLightsRender } from '../../../../../GUI/Platforms/Web/Canvas/Renders/WebCanvasHighLightsRender';
import IRender from '../../../../../GUI/Renderes/IRender';
import Render from '../../../../../GUI/Renderes/Render';
import NotSupportedException from '../../../../../Exceptions/ContextError';


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
