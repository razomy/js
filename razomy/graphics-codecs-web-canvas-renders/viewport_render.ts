import {WebCanvasHighLightsRender} from '@razomy/graphics-codecs-web-canvas-renders';
import type {IRender} from '@razomy/graphics-renderes';
import {Render} from '@razomy/graphics-renderes';
import {ElementView, TextElement, ViewportElement} from '@razomy/graphics-elements';
import {RectangleRender, RectangleShape} from '@razomy/graphics-shapes';
import {UnknownTypeArgumentException} from '@razomy/exceptions';
import * as create from '@razomy/create';


export class ViewportRender {
  constructor() {
  }

  render(): void {
  }
}

export class TextRender {
  constructor() {
  }

  render(): void {
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
      return new ViewportRender();
    } else if (element instanceof TextElement) {
      return new TextRender();
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

    const nodeChildren = node.children;
    for (let i = 0; i < nodeChildren.length; i++) {
      if (!nodeChildren[i]) {
        continue;
      }

      this.iterate(nodeChildren[i]);
    }
  }
}
