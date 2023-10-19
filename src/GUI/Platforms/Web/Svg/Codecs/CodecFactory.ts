import { ICodec } from '../../../../../Interfaces/ICodec.js';
import { IFactory } from '../../../../../Interfaces/IFactory.js';
import { ElementView } from '../../../../Graphics/Elements/ElementView.js';
import { RectangleShape } from '../../../../Graphics/Elements/Shapes/RectangleShape.js';
import { TextElement } from '../../../../Graphics/Elements/TextElement.js';
import { ViewportElement } from '../../../../Graphics/Elements/ViewportElement.js';
import { CodecConfig } from './CodecConfig.js';
import { EncodeNodeFactory } from './EncodeNodeFactory.js';
import { RectangleCodec } from './RectangleCodec.js';
import { SvgCodec } from './SvgCodec.js';
import { TextCodec } from './TextCodec.js';
import NotSupportedException from '../../../../../Exceptions/ContextError.js';


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
