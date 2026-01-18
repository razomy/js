import {ViewGraphic} from 'razomy.graphics.graphic';

export interface IRender<T extends ViewGraphic> {
  render(view: T): void;
}