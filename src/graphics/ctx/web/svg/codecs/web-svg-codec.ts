import ResourceCollection from '../../../../../resources/resource-collection.js';
import NotImplementedException from '../../../../../exceptions/not-implemented-exception.js';
import { ElementView } from '../../../../graphics/elements/element-view.js';
import { CodecConfig } from './codec-config.js';
import { CodecFactory } from './codec-factory.js';
import { CodecRegistry } from './codec-registry.js';
import { EncodeNodeFactory } from './encode-node-factory.js';
import { ICodec } from '../../../../../codec/i-codec.js';

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
