
import { CodecConfig }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec_config';
import { CodecFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec_factory';
import { CodecRegistry }  from 'razomy.js/graphics/codecs/web/svg/codecs/codec_registry';
import { EncodeNodeFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/encode_node_factory';

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
