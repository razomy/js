
import { ElementView } from 'razomy.js/graphics/elements/element-view';
import { WebSvgHighLightsRender }  from 'razomy.js/graphics/codecs/web/svg/renders/web-svg-high-lights-render';
import {CodecRegistry} from 'razomy.js/graphics/codecs/web/svg/codecs/codec-registry';
import {CodecFactory} from 'razomy.js/graphics/codecs/web/svg/codecs/codec-factory';
import {EncodeNodeFactory} from 'razomy.js/graphics/codecs/web/svg/codecs/encode-node-factory';
import {CodecConfig} from 'razomy.js/graphics/codecs/web/svg/codecs/codec-config';
import {Render} from 'razomy.js/graphics/renderes/render';

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
