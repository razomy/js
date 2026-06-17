// Imports
import { Color } from './color';
import type { RGB, RGBA } from './color';
import { ColorCodex } from './color_codex';
import { HexParser } from './hex_parser';
import { HslaParser } from './hsla_parser';
import { RgbaParser } from './rgba_parser';
import { SvgColorParser } from './svg_color_parser';
import type { SvgColorKeys } from './svg_color_parser';

// Named exports
export {
  Color,
  ColorCodex,
  HexParser,
  HslaParser,
  RgbaParser,
  SvgColorParser
};
export type {
  RGB,
  RGBA,
  SvgColorKeys
};

// Default export
const graphicsCodecsWebSvgColor = {
  Color,
  ColorCodex,
  HexParser,
  HslaParser,
  RgbaParser,
  SvgColorParser,
};


export default graphicsCodecsWebSvgColor;
