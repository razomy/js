import { TextAttribute } from 'razomy.js/graphics/attributes/text_attribute';
import { ElementView }  from 'razomy.js/graphics/elements/element_view';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
