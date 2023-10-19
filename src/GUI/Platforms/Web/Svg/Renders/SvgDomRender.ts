import { ElementView } from '../../../../Graphics/Elements/ElementView.js';
import { CodecConfig } from '../Codecs/CodecConfig.js';
import { CodecFactory } from '../Codecs/CodecFactory.js';
import { CodecRegistry } from '../Codecs/CodecRegistry.js';
import { EncodeNodeFactory } from '../Codecs/EncodeNodeFactory.js';
import { WebSvgHighLightsRender } from './WebSvgHighLightsRender.js';
import Render from '../../../../../GUI/Renderes/Render.js';

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
