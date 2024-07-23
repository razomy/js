
import { TextAttribute } from '../attributes/text-attribute.js';
import { ElementView } from './element-view.js';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
