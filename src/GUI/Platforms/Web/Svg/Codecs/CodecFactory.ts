import { ICodec } from '../../../../../Interfaces/ICodec';
import { IFactory } from '../../../../../Interfaces/IFactory';
import { ElementView } from '../../../../../GUI/Graphics/Elements/ElementView';
import { RectangleShape } from '../../../../../GUI/Graphics/Elements/Shapes/RectangleShape';
import { TextElement } from '../../../../../GUI/Graphics/Elements/TextElement';
import { ViewportElement } from '../../../../../GUI/Graphics/Elements/ViewportElement';
import { CodecConfig } from '../../../../../GUI/Platforms/Web/Svg/Codecs/CodecConfig';
import { EncodeNodeFactory } from '../../../../../GUI/Platforms/Web/Svg/Codecs/EncodeNodeFactory';
import { RectangleCodec } from '../../../../../GUI/Platforms/Web/Svg/Codecs/RectangleCodec';
import { SvgCodec } from '../../../../../GUI/Platforms/Web/Svg/Codecs/SvgCodec';
import { TextCodec } from '../../../../../GUI/Platforms/Web/Svg/Codecs/TextCodec';
import NotSupportedException from '../../../../../Exceptions/ContextError';


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

    throw  new NotSupportedException();
  }

  public createByNode(element?: ElementView): ICodec<ElementView, any> {
    if (element instanceof RectangleShape) {
      return new RectangleCodec(this.encodeNodeFactory);
    } else if (element instanceof ViewportElement) {
      return new SvgCodec(this.encodeNodeFactory);
    } else if (element instanceof TextElement) {
      return new TextCodec(this.encodeNodeFactory);
    }

    throw  new NotSupportedException();
  }
}
