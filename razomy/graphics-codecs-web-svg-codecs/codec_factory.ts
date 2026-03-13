import * as abstracts from '@razomy/abstracts';
import * as graphicsElements from '@razomy/graphics-elements';
import * as graphicsShapes from '@razomy/graphics-shapes';
import * as graphicsCodecsWebSvgCodecs from '@razomy/graphics-codecs-web-svg-codecs';
import * as exceptions from '@razomy/exceptions';

export class CodecFactory implements abstracts.patterns.WithCreate<abstracts.abstracts.patterns.Codec<graphicsElements.ElementView, any>> {
  constructor(private encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory) {}

  public create(element?: HTMLElement): abstracts.abstracts.patterns.Codec<graphicsElements.ElementView, any> {
    if (element instanceof SVGRectElement) {
      return new graphicsCodecsWebSvgCodecs.RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof SVGElement) {
      return new graphicsCodecsWebSvgCodecs.SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof SVGTextElement) {
      return new graphicsCodecsWebSvgCodecs.TextCodec(this.encodeNodeFactory);
    } else if (element instanceof Text) {
      return new graphicsCodecsWebSvgCodecs.TextCodec(this.encodeNodeFactory);
    }

    throw new exceptions.UnknownTypeArgumentException(element);
  }

  public createByNode(
    element?: graphicsElements.ElementView,
  ): abstracts.abstracts.patterns.Codec<graphicsElements.ElementView, any> {
    if (element instanceof graphicsShapes.RectangleShape) {
      return new graphicsCodecsWebSvgCodecs.RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof graphicsElements.ViewportElement) {
      return new graphicsCodecsWebSvgCodecs.SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof graphicsElements.TextElement) {
      return new graphicsCodecsWebSvgCodecs.TextCodec(this.encodeNodeFactory);
    }

    throw new exceptions.UnknownTypeArgumentException(element);
  }
}
