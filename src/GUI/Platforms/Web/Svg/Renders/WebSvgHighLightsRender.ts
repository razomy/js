import { ElementView } from '../../../../../GUI/Graphics/Elements/ElementView';
import { SelectionAttribute } from '../../../../../GUI/SelectionAttribute';
import { UserEntity } from '../../../../../GUI/UserEntity';

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
