import {ElementView} from 'razomy.graphics/elements/element_view';
import {SelectionAttribute} from 'razomy.graphics/graphic/selection_attribute';
import {UserEntity} from 'razomy.graphics/graphic/user_entity';

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
