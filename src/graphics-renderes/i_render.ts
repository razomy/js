import * as graphicsGraphic from '@razomy/graphics-graphic';

export interface IRender<T extends graphicsGraphic.ViewGraphic> {
  render(view: T): void;
}
