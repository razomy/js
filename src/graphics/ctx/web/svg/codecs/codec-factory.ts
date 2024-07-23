import { ICodec } from '../../../../../codec/i-codec.js';
import { IFactory } from '../../../../../interfaces/i-factory.js';
import { ElementView } from '../../../../graphics/elements/element-view.js';
import { RectangleShape } from '../../../../graphics/elements/shapes/rectangle-shape.js';
import { TextElement } from '../../../../graphics/elements/text-element.js';
import { ViewportElement } from '../../../../graphics/elements/viewport-element.js';
import { CodecConfig } from './codec-config.js';
import { EncodeNodeFactory } from './encode-node-factory.js';
import { RectangleCodec } from './rectangle-codec.js';
import { SvgCodec } from './svg-codec.js';
import { TextCodec } from './text-codec.js';
import NotSupportedException from '../../../../../exceptions/context-error.js';


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
