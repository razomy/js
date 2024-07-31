import {IRender}  from 'razomy.js/graphics/renderes/i_render';
import {ViewGraphic} from 'razomy.js/graphics/graphic/view_graphic';

export abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
