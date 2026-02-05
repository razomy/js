import {CodecConfig} from '@razomy/graphics.codecs.web.svg.codecs';
import {CodecFactory} from '@razomy/graphics.codecs.web.svg.codecs';
import {CodecRegistry} from '@razomy/graphics.codecs.web.svg.codecs';
import {EncodeNodeFactory} from '@razomy/graphics.codecs.web.svg.codecs';

export class WebSvgContext {

  constructor(
    public codecConfig: CodecConfig,
    public encodeNodeFactory: EncodeNodeFactory,
    public codecFactory: CodecFactory,
    public codecRegistry: CodecRegistry
  ) {
  }

  static create(): WebSvgContext {
    const codecConfig: CodecConfig = new CodecConfig();
    const encodeNodeFactory: EncodeNodeFactory = new EncodeNodeFactory(codecConfig);
    const codecFactory: CodecFactory = new CodecFactory(codecConfig, encodeNodeFactory);
    const codecRegistry: CodecRegistry = new CodecRegistry();
    return new WebSvgContext(
      codecConfig,
      encodeNodeFactory,
      codecFactory,
      codecRegistry
    );
  }
}
