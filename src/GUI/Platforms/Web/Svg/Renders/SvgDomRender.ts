import { ElementView } from '../../../../../GUI/Graphics/Elements/ElementView';
import { CodecConfig } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecConfig';
import { CodecFactory } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecFactory';
import { CodecRegistry } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecRegistry';
import { EncodeNodeFactory } from '../../../../../GUI/Platforms/Web/Svg/Codecs/EncodeNodeFactory';
import { WebSvgHighLightsRender } from '../../../../../GUI/Platforms/Web/Svg/Renders/WebSvgHighLightsRender';
import Render from '../../../../../GUI/Renderes/Render';

export class WebSvgRender extends Render<ElementView> {

  constructor(
    public codecConfig: CodecConfig,
    public encodeNodeFactory: EncodeNodeFactory,
    public codecFactory: CodecFactory,
    public codecRegistry: CodecRegistry,
    public rootNode: Node,
    public webSvgHighLightsRender: WebSvgHighLightsRender
  ) {
    super();
  }

  public render(view: ElementView): void {
    if (this.rootNode.firstChild) {
      throw new Error('Not empty root');
    }

    const node = this.iterate(view);
    this.rootNode.appendChild(node);
  }

  private iterate(node: ElementView): Node {
    const value = this.codecFactory.createByNode(node).encode(node);
    this.webSvgHighLightsRender.render(node, value);
    const nodeChildren = node.children;
    for (let i = 0; i < nodeChildren.length; i++) {
      if (!nodeChildren[i]) {
        continue;
      }

      const subValue = this.iterate(nodeChildren[i]);
      value.appendChild(subValue);
    }

    return value;
  }
}
