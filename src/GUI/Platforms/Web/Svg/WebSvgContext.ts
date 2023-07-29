import { CodecConfig } from '../../../../GUI/Platforms/Web/Svg/Codecs/CodecConfig';
import { CodecFactory } from '../../../../GUI/Platforms/Web/Svg/Codecs/CodecFactory';
import { CodecRegistry } from '../../../../GUI/Platforms/Web/Svg/Codecs/CodecRegistry';
import { EncodeNodeFactory } from '../../../../GUI/Platforms/Web/Svg/Codecs/EncodeNodeFactory';

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
