import { PositionAttribute } from '../../../../Graphics/Attributes/PositionAttribute.js';
import { SizeAttribute } from '../../../../Graphics/Attributes/SizeAttribute.js';
import { ElementView } from '../../../../Graphics/Elements/ElementView.js';
import { RectangleShape } from '../../../../Graphics/Elements/Shapes/RectangleShape.js';
import { RectangleRender } from './RectangleRender.js';
import { RenderFactory } from './WebCanvasRender.js';
import { SelectionAttribute } from '../../../../SelectionAttribute.js';
import { UserEntity } from '../../../../UserEntity.js';

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
