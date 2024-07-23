import { ViewGraphic } from '../graphics/view-graphic.js';

export default interface IRender<T extends ViewGraphic> {
  render(view: T): void;
}