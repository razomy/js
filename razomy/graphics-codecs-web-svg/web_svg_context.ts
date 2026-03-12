import * as graphicsCodecsWebSvgCodecs from '@razomy/graphics-codecs-web-svg-codecs';

export class WebSvgContext {
  constructor(
    public codecConfig: graphicsCodecsWebSvgCodecs.CodecConfig,
    public encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory,
    public codecFactory: graphicsCodecsWebSvgCodecs.CodecFactory,
    public codecRegistry: graphicsCodecsWebSvgCodecs.CodecRegistry,
  ) {}

  static create(): WebSvgContext {
    const codecConfig: graphicsCodecsWebSvgCodecs.CodecConfig = new graphicsCodecsWebSvgCodecs.CodecConfig();
    const encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory =
      new graphicsCodecsWebSvgCodecs.EncodeNodeFactory(codecConfig);
    const codecFactory: graphicsCodecsWebSvgCodecs.CodecFactory = new graphicsCodecsWebSvgCodecs.CodecFactory(
      encodeNodeFactory,
    );
    const codecRegistry: graphicsCodecsWebSvgCodecs.CodecRegistry = new graphicsCodecsWebSvgCodecs.CodecRegistry();
    return new WebSvgContext(codecConfig, encodeNodeFactory, codecFactory, codecRegistry);
  }
}
