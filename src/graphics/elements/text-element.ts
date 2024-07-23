
import { TextAttribute } from 'razomy.js/graphics/attributes/text-attribute';
import { ElementView } from './element-view';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
