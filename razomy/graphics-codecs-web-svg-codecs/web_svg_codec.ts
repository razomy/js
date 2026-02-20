import {NotImplementedException} from '@razomy/exceptions';
import {ElementView} from '@razomy/graphics-elements';
import {CodecFactory} from '@razomy/graphics-codecs-web-svg-codecs';
import type {Codec} from '@razomy/codec';
import {ResourceCollection} from '@razomy/resources';

export class WebSvgCodec implements Codec<ElementView, Node> {

  constructor(
    private codecFactory: CodecFactory,
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
