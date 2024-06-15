
import { ElementView } from '../../../../graphics/elements/element-view.js';
import { CodecConfig } from '../codecs/codec-config.js';
import { CodecFactory } from '../codecs/codec-factory.js';
import { CodecRegistry } from '../codecs/codec-registry.js';
import { EncodeNodeFactory } from '../codecs/encode-node-factory.js';
import { WebSvgHighLightsRender } from './web-svg-high-lights-render.js';
import Render from '../../../../renderes/render.js';

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
