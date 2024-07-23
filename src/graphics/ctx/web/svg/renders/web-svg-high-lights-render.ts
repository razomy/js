import { ElementView } from '../../../../graphics/elements/element-view.js';
import { SelectionAttribute } from '../../../../selection-attribute.js';
import { UserEntity } from '../../../../user-entity.js';

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
