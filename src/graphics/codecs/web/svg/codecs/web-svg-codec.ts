import {NotImplementedException} from 'razomy.js/exceptions/not-implemented-exception';
import { ElementView } from 'razomy.js/graphics/elements/element-view';
import { CodecConfig }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec-config';
import { CodecFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec-factory';
import { CodecRegistry }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec-registry';
import { EncodeNodeFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/encode-node-factory';
import { ICodec } from 'razomy.js/codec/i-codec';
import {ResourceCollection} from 'razomy.js/resources/resource-collection';

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
