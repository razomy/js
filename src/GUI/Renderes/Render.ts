import { ViewGraphic } from '../Graphics/ViewGraphic';
import IRender from '../../GUI/Renderes/IRender';

export default abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
