import {IRender} from 'razomy.graphics.renderes';
import {ViewGraphic} from 'razomy.graphics.graphic';

export abstract class Render<T extends ViewGraphic = ViewGraphic> implements IRender<T> {
  public abstract render(view: T): void;
}
