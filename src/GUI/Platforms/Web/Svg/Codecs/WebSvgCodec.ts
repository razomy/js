import ResourceCollection from '../../../../../Resources/ResourceCollection';
import NotImplementedException from '../../../../../Exceptions/NotImplementedException';
import { ICodec } from '../../../../../Interfaces/ICodec';
import { ElementView } from '../../../../../GUI/Graphics/Elements/ElementView';
import { CodecConfig } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecConfig';
import { CodecFactory } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecFactory';
import { CodecRegistry } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecRegistry';
import { EncodeNodeFactory } from '../../../../../GUI/Platforms/Web/Svg/Codecs/EncodeNodeFactory';

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
