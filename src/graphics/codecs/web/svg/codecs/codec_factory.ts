import { Codec } from 'src/codec/codec';
import * as create from 'razomy.create';
import { ElementView } from 'razomy.graphics/elements/element_view';
import { RectangleShape } from 'razomy.graphics/shapes/rectangle_shape';
import { TextElement } from 'razomy.graphics/elements/text_element';
import { ViewportElement } from 'razomy.graphics/elements/viewport_element';
import { CodecConfig }  from 'razomy.graphics/codecs/web/svg/codecs/codec_config';
import { EncodeNodeFactory }  from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';
import { RectangleCodec }  from 'razomy.graphics/codecs/web/svg/codecs/rectangle_codec';
import { SvgCodec }  from 'razomy.graphics/codecs/web/svg/codecs/svg_codec';
import { TextCodec }  from 'razomy.graphics/codecs/web/svg/codecs/text_codec';

import {UnknownTypeArgumentException} from 'razomy.exceptions/unknown_type_argument_exception';


export class CodecFactory implements create.With<Codec<ElementView, any>> {

  constructor(
    private codecConfig: CodecConfig,
    private encodeNodeFactory: EncodeNodeFactory
  ) {
  }

  public create(element?: HTMLElement): Codec<ElementView, any> {
    if (element instanceof SVGRectElement) {
      return new RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof SVGElement) {
      return new SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof SVGTextElement) {
      return new TextCodec(this.encodeNodeFactory);
    } else if (element instanceof Text) {
      return new TextCodec(this.encodeNodeFactory);
    }

    throw new UnknownTypeArgumentException(element);
  }

  public create_by_node(element?: ElementView): Codec<ElementView, any> {
    if (element instanceof RectangleShape) {
      return new RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof ViewportElement) {
      return new SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof TextElement) {
      return new TextCodec(this.encodeNodeFactory);
    }

    throw new UnknownTypeArgumentException(element);
  }
}
