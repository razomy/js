import { ICodec } from 'razomy.js/codec/i-codec';
import { IFactory } from 'razomy.js/interfaces/i-factory';
import { ElementView } from 'razomy.js/graphics/elements/element-view';
import { RectangleShape } from 'razomy.js/graphics/shapes/rectangle-shape';
import { TextElement } from 'razomy.js/graphics/elements/text-element';
import { ViewportElement } from 'razomy.js/graphics/elements/viewport-element';
import { CodecConfig } from './codec-config';
import { EncodeNodeFactory } from './encode-node-factory';
import { RectangleCodec } from './rectangle-codec';
import { SvgCodec } from './svg-codec';
import { TextCodec } from './text-codec';
import {NotSupportedException} from "razomy.js/exceptions/not-supported-exception";


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
