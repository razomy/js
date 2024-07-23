import { ElementView } from 'razomy.js/graphics/elements/element-view';
import { SelectionAttribute } from 'razomy.js/graphics/graphic/selection-attribute';
import { UserEntity } from 'razomy.js/graphics/graphic/user-entity';

export class WebSvgHighLightsRender {
  constructor(
    public user: UserEntity
  ) {
  }

  public render(view: ElementView, node: SVGElement): void {
    if (this.user.getBy(SelectionAttribute).selection.contains(view)) {
      node.setAttribute('style', 'filter: drop-shadow(0px 3px 3px #00f);');
    }
  }
}
