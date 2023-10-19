import { ViewGraphic } from '../Graphics/ViewGraphic.js';
import IRender from '../../GUI/Renderes/IRender.js';

export default abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
