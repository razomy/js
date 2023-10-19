import ResourceCollection from '../../../../../Resources/ResourceCollection.js';
import NotImplementedException from '../../../../../Exceptions/NotImplementedException.js';
import { ICodec } from '../../../../../Interfaces/ICodec.js';
import { ElementView } from '../../../../Graphics/Elements/ElementView.js';
import { CodecConfig } from './CodecConfig.js';
import { CodecFactory } from './CodecFactory.js';
import { CodecRegistry } from './CodecRegistry.js';
import { EncodeNodeFactory } from './EncodeNodeFactory.js';

export class WebSvgCodec implements ICodec<ElementView, Node> {

  constructor(
    private codecConfig: CodecConfig,
    private encodeNodeFactory: EncodeNodeFactory,
    private codecFactory: CodecFactory,
    private codecRegistry: CodecRegistry
  ) {
  }

  decode(value: Node): ElementView {
    return this.iterate(<HTMLElement> value);
  }

  public encode(node: ElementView): Node {
    throw new NotImplementedException();
  }

  private iterate(value: HTMLElement): ElementView {
    const node = this.codecFactory.create(value).decode(value);

    const valueChildren = value.childNodes;
    for (let i = 0; i < valueChildren.length; i++) {
      if (!valueChildren[i]) {
        continue;
      }

      const subNode = this.iterate(<HTMLElement> valueChildren[i]);
      node.getBy(ResourceCollection).add(subNode);
    }

    return node;
  }


}
