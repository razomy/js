import {TextAttribute} from 'razomy.graphics/attributes/text_attribute';
import {ElementView} from 'razomy.graphics/elements/element_view';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
