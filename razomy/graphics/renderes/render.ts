import {IRender} from 'razomy.graphics/renderes/i_render';
import {ViewGraphic} from 'razomy.graphics/graphic/view_graphic';

export abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
