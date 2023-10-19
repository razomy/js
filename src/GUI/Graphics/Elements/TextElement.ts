import { TextAttribute } from '../Attributes/TextAttribute.js';
import { ElementView } from './ElementView.js';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
