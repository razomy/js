import {IRender} from './i-render';
import {ViewGraphic} from "razomy.js/graphics/graphic/view-graphic";

export abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
