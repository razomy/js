import {NotImplementedException} from '@razomy/exceptions';
import {ElementView} from '@razomy/graphics.elements';
import {CodecConfig} from '@razomy/graphics.codecs.web.svg.codecs';
import {CodecFactory} from '@razomy/graphics.codecs.web.svg.codecs';
import {CodecRegistry} from '@razomy/graphics.codecs.web.svg.codecs';
import {EncodeNodeFactory} from '@razomy/graphics.codecs.web.svg.codecs';
import {Codec} from '@razomy/codec';
import {ResourceCollection} from '@razomy/resources';

export class WebSvgCodec implements Codec<ElementView, Node> {

  constructor(
    private codecConfig: CodecConfig,
    private encodeNodeFactory: EncodeNodeFactory,
    private codecFactory: CodecFactory,
    private codecRegistry: CodecRegistry
  ) {
  }

  decode(value: Node): ElementView {
    return this.iterate(<HTMLElement>value);
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

      const subNode = this.iterate(<HTMLElement>valueChildren[i]);
      node.getBy(ResourceCollection).add(subNode);
    }

    return node;
  }
}
