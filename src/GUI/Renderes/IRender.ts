import { ViewGraphic } from '../Graphics/ViewGraphic';

export default interface IRender<T extends ViewGraphic> {
  render(view: T): void;
}
