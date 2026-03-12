import * as graphicsElements from '@razomy/graphics-elements';
import * as graphicsGraphic from '@razomy/graphics-graphic';

export class WebSvgHighLightsRender {
  constructor(public user: graphicsGraphic.UserEntity) {}

  public render(view: graphicsElements.ElementView, node: SVGElement): void {
    if (this.user.getBy(graphicsGraphic.SelectionAttribute).selection.contains(view)) {
      node.setAttribute('style', 'filter: drop-shadow(0px 3px 3px #00f);');
    }
  }
}
