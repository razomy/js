import { PositionAttribute } from '../../../../../GUI/Graphics/Attributes/PositionAttribute';
import { SizeAttribute } from '../../../../../GUI/Graphics/Attributes/SizeAttribute';
import { ElementView } from '../../../../../GUI/Graphics/Elements/ElementView';
import { RectangleShape } from '../../../../../GUI/Graphics/Elements/Shapes/RectangleShape';
import { RectangleRender } from '../../../../../GUI/Platforms/Web/Canvas/Renders/RectangleRender';
import { RenderFactory } from '../../../../../GUI/Platforms/Web/Canvas/Renders/WebCanvasRender';
import { SelectionAttribute } from '../../../../../GUI/SelectionAttribute';
import { UserEntity } from '../../../../../GUI/UserEntity';

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
