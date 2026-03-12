import * as exceptions from '@razomy/exceptions';
import * as graphicsElements from '@razomy/graphics-elements';
import * as graphicsCodecsWebSvgCodecs from '@razomy/graphics-codecs-web-svg-codecs';
import * as abstracts from '@razomy/abstracts';
import * as resources from '@razomy/resources';

export class WebSvgCodec implements abstracts.patterns.Codec<graphicsElements.ElementView, Node> {
  constructor(private codecFactory: graphicsCodecsWebSvgCodecs.CodecFactory) {}

  decode(value: Node): graphicsElements.ElementView {
    return this.iterate(<HTMLElement>value);
  }

  public encode(node: graphicsElements.ElementView): Node {
    throw new exceptions.NotImplementedException();
  }

  private iterate(value: HTMLElement): graphicsElements.ElementView {
    const node = this.codecFactory.create(value).decode(value);

    const valueChildren = value.childNodes;
    for (let i = 0; i < valueChildren.length; i++) {
      if (!valueChildren[i]) {
        continue;
      }

      const subNode = this.iterate(<HTMLElement>valueChildren[i]);
      node.getBy(resources.ResourceCollection).add(subNode);
    }

    return node;
  }
}
