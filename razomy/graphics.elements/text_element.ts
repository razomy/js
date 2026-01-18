import {TextAttribute} from 'razomy.graphics.attributes';
import {ElementView} from 'razomy.graphics.elements';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
