import { RenderFactory }  from 'razomy.js/graphics/codecs/web/canvas/renders/web_canvas_render';
import { SelectionAttribute } from 'razomy.js/graphics/graphic/selection_attribute';
import { UserEntity } from 'razomy.js/graphics/graphic/user_entity';
import {SizeAttribute} from 'razomy.js/graphics/attributes/size_attribute';
import {PositionAttribute} from 'razomy.js/graphics/attributes/position_attribute';
import {ElementView} from 'razomy.js/graphics/elements/element_view';
import {RectangleShape} from 'razomy.js/graphics/shapes/rectangle_shape';
import {RectangleRender} from 'razomy.js/graphics/shapes/rectangle_render';

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
