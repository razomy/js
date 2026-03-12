import * as graphicsCodecsWebCanvasRenders from '@razomy/graphics-codecs-web-canvas-renders';
import * as graphicsGraphic from '@razomy/graphics-graphic';
import * as graphicsAttributes from '@razomy/graphics-attributes';
import * as graphicsElements from '@razomy/graphics-elements';
import * as graphicsShapes from '@razomy/graphics-shapes';

export class WebCanvasHighLightsRender {
  constructor(
    public user: graphicsGraphic.UserEntity,
    public ctx: CanvasRenderingContext2D,
    public codecFactory: graphicsCodecsWebCanvasRenders.RenderFactory,
  ) {}

  public render(view: graphicsElements.ElementView): void {
    this.iterate(view);
  }

  private iterate(node: graphicsElements.ElementView) {
    if (this.user.getBy(graphicsGraphic.SelectionAttribute).selection.contains(node)) {
      const rect = new graphicsShapes.RectangleShape();

      this.ctx.save();
      this.ctx.shadowColor = '#00f';
      this.ctx.shadowBlur = 20;
      rect.replace(node.getBy(graphicsAttributes.PositionAttribute));
      rect.replace(node.getBy(graphicsAttributes.SizeAttribute));
      new graphicsShapes.RectangleRender(this.ctx).render(rect);
      this.ctx.restore();
    }
    const nodeChildren = node.children;
    for (let i = 0; i < nodeChildren.length; i++) {
      if (!nodeChildren[i]) {
        continue;
      }

      this.iterate(nodeChildren[i]);
    }
  }
}
