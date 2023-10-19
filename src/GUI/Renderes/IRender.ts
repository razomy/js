import { ViewGraphic } from '../Graphics/ViewGraphic.js';

export default interface IRender<T extends ViewGraphic> {
  render(view: T): void;
}
