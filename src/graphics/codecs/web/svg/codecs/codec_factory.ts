import { ICodec } from 'razomy.js/codec/i_codec';
import { IFactory } from 'razomy.js/factory/i_factory';
import { ElementView } from 'razomy.js/graphics/elements/element_view';
import { RectangleShape } from 'razomy.js/graphics/shapes/rectangle_shape';
import { TextElement } from 'razomy.js/graphics/elements/text_element';
import { ViewportElement } from 'razomy.js/graphics/elements/viewport_element';
import { CodecConfig }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec_config';
import { EncodeNodeFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/encode_node_factory';
import { RectangleCodec }  from 'razomy.js/graphics/codecs/web/svg/codecs/rectangle_codec';
import { SvgCodec }  from 'razomy.js/graphics/codecs/web/svg/codecs/svg_codec';
import { TextCodec }  from 'razomy.js/graphics/codecs/web/svg/codecs/text_codec';
import {NotSupportedException} from 'razomy.js/exceptions/not_supported_exception';


export class CodecFactory implements IFactory<ICodec<ElementView, any>> {

  constructor(
    private codecConfig: CodecConfig,
    private encodeNodeFactory: EncodeNodeFactory
  ) {
  }

  public create(element?: HTMLElement): ICodec<ElementView, any> {
    if (element instanceof SVGRectElement) {
      return new RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof SVGElement) {
      return new SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof SVGTextElement) {
      return new TextCodec(this.encodeNodeFactory);
    } else if (element instanceof Text) {
      return new TextCodec(this.encodeNodeFactory);
    }

    throw new NotSupportedException();
  }

  public createByNode(element?: ElementView): ICodec<ElementView, any> {
    if (element instanceof RectangleShape) {
      return new RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof ViewportElement) {
      return new SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof TextElement) {
      return new TextCodec(this.encodeNodeFactory);
    }

    throw new NotSupportedException();
  }
}
