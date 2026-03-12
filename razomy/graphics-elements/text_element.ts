import * as graphicsAttributes from '@razomy/graphics-attributes';
import * as graphicsElements from '@razomy/graphics-elements';

export class TextElement extends graphicsElements.ElementView {
  constructor() {
    super();
    this.resources[graphicsAttributes.TextAttribute.type] = new graphicsAttributes.TextAttribute('');
  }
}
