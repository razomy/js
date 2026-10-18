// Imports
import type { ITreeNodeAttribute } from './i_tree_node_attribute';
import { PositionAttribute } from './position_attribute';
import type { IPositionAttribute } from './position_attribute';
import { SizeAttribute } from './size_attribute';
import type { ISizeResource } from './size_attribute';
import { StyleAttribute } from './style_attribute';
import { TextAttribute } from './text_attribute';
import { TextStyle } from './text_style';

// Named exports
export {
  PositionAttribute,
  SizeAttribute,
  StyleAttribute,
  TextAttribute,
  TextStyle
};
export type {
  IPositionAttribute,
  ISizeResource,
  ITreeNodeAttribute
};

// Default export
const graphicsAttributes = {
  PositionAttribute,
  SizeAttribute,
  StyleAttribute,
  TextAttribute,
  TextStyle,
};


export default graphicsAttributes;
