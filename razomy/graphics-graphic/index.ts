// Imports
import { GraphicEntity } from './graphic_entity';
import { SelectionAttribute } from './selection_attribute';
import { UserEntity } from './user_entity';
import { ViewGraphic } from './view_graphic';
import type { IViewGraphic } from './view_graphic';

// Named exports
export {
  GraphicEntity,
  SelectionAttribute,
  UserEntity,
  ViewGraphic
};
export type {
  IViewGraphic
};

// Default export
const graphicsGraphic = {
  GraphicEntity,
  SelectionAttribute,
  UserEntity,
  ViewGraphic,
};


export default graphicsGraphic;
