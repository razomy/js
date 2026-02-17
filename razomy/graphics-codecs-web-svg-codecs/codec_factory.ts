import {Codec} from '@razomy/codec';
import * as create from '@razomy/create';
import {ElementView} from '@razomy/graphics-elements';
import {RectangleShape} from '@razomy/graphics-shapes';
import {TextElement} from '@razomy/graphics-elements';
import {ViewportElement} from '@razomy/graphics-elements';
import {CodecConfig} from '@razomy/graphics-codecs-web-svg-codecs';
import {EncodeNodeFactory} from '@razomy/graphics-codecs-web-svg-codecs';
import {RectangleCodec} from '@razomy/graphics-codecs-web-svg-codecs';
import {SvgCodec} from '@razomy/graphics-codecs-web-svg-codecs';
import {TextCodec} from '@razomy/graphics-codecs-web-svg-codecs';

import {UnknownTypeArgumentException} from '@razomy/exceptions';


export class CodecFactory implements create.WithCreate<Codec<ElementView, any>> {

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

  public createByNode(element?: ElementView): Codec<ElementView, any> {
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
