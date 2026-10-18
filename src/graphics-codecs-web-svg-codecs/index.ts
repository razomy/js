// Imports
import { CodecConfig } from './codec_config';
import { CodecFactory } from './codec_factory';
import { CodecRegistry } from './codec_registry';
import { EncodeNodeFactory } from './encode_node_factory';
import { RectangleCodec } from './rectangle_codec';
import { SvgCodec } from './svg_codec';
import { TextCodec } from './text_codec';
import { WebSvgCodec } from './web_svg_codec';

// Named exports
export {
  CodecConfig,
  CodecFactory,
  CodecRegistry,
  EncodeNodeFactory,
  RectangleCodec,
  SvgCodec,
  TextCodec,
  WebSvgCodec
};

// Default export
const graphicsCodecsWebSvgCodecs = {
  CodecConfig,
  CodecFactory,
  CodecRegistry,
  EncodeNodeFactory,
  RectangleCodec,
  SvgCodec,
  TextCodec,
  WebSvgCodec,
};

export default graphicsCodecsWebSvgCodecs;
