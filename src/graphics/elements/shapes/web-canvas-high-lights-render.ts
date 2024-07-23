
import { PositionAttribute } from '../../attributes/position-attribute.js';
import { SizeAttribute } from '../../attributes/size-attribute.js';
import { ElementView } from '../element-view.js';
import { RectangleShape } from './rectangle-shape.js';
import { RectangleRender } from './rectangle-render.js';
import { SelectionAttribute } from '../../../selection-attribute.js';
import { UserEntity } from '../../../user-entity.js';
import { RenderFactory } from '../../../platforms/web/Canvas/Renders/WebCanvasRender.js';

export class WebCanvasHighLightsRender {
  constructor(
    public user: UserEntity,
    public ctx: CanvasRenderingContext2D,
    public codecFactory: RenderFactory
  ) {}

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
