import { ElementView } from 'razomy/graphics/elements/element_view';
import { WebSvgHighLightsRender }  from 'razomy/graphics/codecs/web/svg/renders/web_svg_high_lights_render';
import {CodecRegistry} from 'razomy/graphics/codecs/web/svg/codecs/codec_registry';
import {CodecFactory} from 'razomy/graphics/codecs/web/svg/codecs/codec_factory';
import {EncodeNodeFactory} from 'razomy/graphics/codecs/web/svg/codecs/encode_node_factory';
import {CodecConfig} from 'razomy/graphics/codecs/web/svg/codecs/codec_config';
import {Render} from 'razomy/graphics/renderes/render';

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
