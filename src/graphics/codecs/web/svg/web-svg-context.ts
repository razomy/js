
import { CodecConfig } from './codecs/codec-config';
import { CodecFactory } from './codecs/codec-factory';
import { CodecRegistry } from './codecs/codec-registry';
import { EncodeNodeFactory } from './codecs/encode-node-factory';

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
