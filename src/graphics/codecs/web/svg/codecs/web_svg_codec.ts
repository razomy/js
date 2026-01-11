import {NotImplementedException} from 'razomy/exceptions/not_implemented_exception';
import { ElementView } from 'razomy/graphics/elements/element_view';
import { CodecConfig }  from 'razomy/graphics/codecs/web/svg/codecs/codec_config';
import { CodecFactory }  from 'razomy/graphics/codecs/web/svg/codecs/codec_factory';
import { CodecRegistry }  from 'razomy/graphics/codecs/web/svg/codecs/codec_registry';
import { EncodeNodeFactory }  from 'razomy/graphics/codecs/web/svg/codecs/encode_node_factory';
import { ICodec } from 'razomy/codec/i_codec';
import {ResourceCollection} from 'razomy/resources/resource_collection';

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
