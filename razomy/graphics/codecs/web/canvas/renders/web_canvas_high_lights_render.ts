import { RenderFactory }  from 'razomy.graphics/codecs/web/canvas/renders/viewport_render';
import { SelectionAttribute } from 'razomy.graphics/graphic/selection_attribute';
import { UserEntity } from 'razomy.graphics/graphic/user_entity';
import {SizeAttribute} from 'razomy.graphics/attributes/size_attribute';
import {PositionAttribute} from 'razomy.graphics/attributes/position_attribute';
import {ElementView} from 'razomy.graphics/elements/element_view';
import {RectangleShape} from 'razomy.graphics/shapes/rectangle_shape';
import {RectangleRender} from 'razomy.graphics/shapes/rectangle_render';

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
    if (this.user.get_by(SelectionAttribute).selection.contains(node)) {
      const rect = new RectangleShape();

      this.ctx.save();
      this.ctx.shadowColor = '#00f';
      this.ctx.shadowBlur = 20;
      rect.replace(node.get_by(PositionAttribute));
      rect.replace(node.get_by(SizeAttribute));
      new RectangleRender(this.ctx).render(rect);
      this.ctx.restore();
    }
    const node_children = node.children;
    for (let i = 0; i < node_children.length; i++) {
      if (!node_children[i]) {
        continue;
      }

      this.iterate(node_children[i]);
    }
  }
}
