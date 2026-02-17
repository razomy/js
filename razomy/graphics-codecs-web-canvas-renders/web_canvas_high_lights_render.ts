import {RenderFactory} from '@razomy/graphics-codecs-web-canvas-renders';
import {SelectionAttribute} from '@razomy/graphics-graphic';
import {UserEntity} from '@razomy/graphics-graphic';
import {SizeAttribute} from '@razomy/graphics-attributes';
import {PositionAttribute} from '@razomy/graphics-attributes';
import {ElementView} from '@razomy/graphics-elements';
import {RectangleShape} from '@razomy/graphics-shapes';
import {RectangleRender} from '@razomy/graphics-shapes';

export class WebCanvasHighLightsRender {
  constructor(
    public user: UserEntity,
    public ctx: CanvasRenderingContext2D,
    public codecFactory: RenderFactory
  ) {
  }

  public render(view: ElementView): void {
    this.iterate(view);
  }

  private iterate(node: ElementView) {
    if (this.user.getBy(SelectionAttribute).selection.contains(node)) {
      const rect = new RectangleShape();

      this.ctx.save();
      this.ctx.shadowColor = '#00f';
      this.ctx.shadowBlur = 20;
      rect.replace(node.getBy(PositionAttribute));
      rect.replace(node.getBy(SizeAttribute));
      new RectangleRender(this.ctx).render(rect);
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
