import { TextAttribute } from '../../../GUI/Graphics/Attributes/TextAttribute';
import { ElementView } from './ElementView';


export class TextElement extends ElementView {
  constructor() {
    super();
    this.resources[TextAttribute.type] = new TextAttribute('');
  }
}
