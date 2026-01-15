import {NotImplementedException} from 'razomy.exceptions/not_implemented_exception';
import { ElementView } from 'razomy.graphics/elements/element_view';
import { CodecConfig }  from 'razomy.graphics/codecs/web/svg/codecs/codec_config';
import { CodecFactory }  from 'razomy.graphics/codecs/web/svg/codecs/codec_factory';
import { CodecRegistry }  from 'razomy.graphics/codecs/web/svg/codecs/codec_registry';
import { EncodeNodeFactory }  from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';
import { Codec } from 'src/codec/codec';
import {ResourceCollection} from 'razomy.resources/resource_collection';

export class WebSvgCodec implements Codec<ElementView, Node> {

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

    const value_children = value.childNodes;
    for (let i = 0; i < value_children.length; i++) {
      if (!value_children[i]) {
        continue;
      }

      const sub_node = this.iterate(<HTMLElement> value_children[i]);
      node.getBy(ResourceCollection).add(sub_node);
    }

    return node;
  }
}
