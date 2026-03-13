import * as graphicsCodecsWebCanvasRenders from '@razomy/graphics-codecs-web-canvas-renders';
import * as graphicsRenderes from '@razomy/graphics-renderes';
import * as graphicsElements from '@razomy/graphics-elements';
import * as graphicsShapes from '@razomy/graphics-shapes';
import * as exceptions from '@razomy/exceptions';
import * as abstracts from "@razomy/abstracts";

export class ViewportRender {
  constructor() {}

  render(): void {}
}

export class TextRender {
  constructor() {}

  render(): void {}
}

export class CanvasRectangle {}

export class RenderFactory implements abstracts.patterns.WithCreate<graphicsRenderes.IRender<any>> {
  constructor(public ctx: CanvasRenderingContext2D) {}

  public create(element?: graphicsElements.ElementView): graphicsRenderes.IRender<any> {
    if (element instanceof graphicsShapes.RectangleShape) {
      return new graphicsShapes.RectangleRender(this.ctx);
    } else if (element instanceof graphicsElements.ViewportElement) {
      return new ViewportRender();
    } else if (element instanceof graphicsElements.TextElement) {
      return new TextRender();
    }

    throw new exceptions.UnknownTypeArgumentException('un');
  }
}

export class WebCanvasRender extends graphicsRenderes.Render {
  constructor(
    public codecFactory: RenderFactory,
    public crx: CanvasRenderingContext2D,
    public webSvgHighLightsRender: graphicsCodecsWebCanvasRenders.WebCanvasHighLightsRender,
  ) {
    super();
  }

  public render(view: graphicsElements.ElementView): void {
    this.webSvgHighLightsRender.render(view);
    this.iterate(view);
  }

  private iterate(node: graphicsElements.ElementView) {
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
