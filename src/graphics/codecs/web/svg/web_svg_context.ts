import { CodecConfig }  from 'razomy/graphics/codecs/web/svg/codecs/codec_config';
import { CodecFactory }  from 'razomy/graphics/codecs/web/svg/codecs/codec_factory';
import { CodecRegistry }  from 'razomy/graphics/codecs/web/svg/codecs/codec_registry';
import { EncodeNodeFactory }  from 'razomy/graphics/codecs/web/svg/codecs/encode_node_factory';

export class WebSvgContext {

  constructor(
    public codecConfig: CodecConfig,
    public encodeNodeFactory: EncodeNodeFactory,
    public codecFactory: CodecFactory,
    public codecRegistry: CodecRegistry
  ) {
  }

  static create(): WebSvgContext {
    const codec_config: CodecConfig = new CodecConfig();
    const encode_node_factory: EncodeNodeFactory = new EncodeNodeFactory(codec_config);
    const codec_factory: CodecFactory = new CodecFactory(codec_config, encode_node_factory);
    const codec_registry: CodecRegistry = new CodecRegistry();
    return new WebSvgContext(
      codec_config,
      encode_node_factory,
      codec_factory,
      codec_registry
    );
  }
}
