import { ViewGraphic } from 'razomy.js/graphics/graphic/view-graphic';

export interface IRender<T extends ViewGraphic> {
  render(view: T): void;
}