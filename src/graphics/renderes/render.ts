
import { ViewGraphic } from '../view-graphic.js';
import IRender from './i-render.js';

export default abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
