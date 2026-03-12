import * as graphicsRenderes from "@razomy/graphics-renderes";
import * as graphicsGraphic from "@razomy/graphics-graphic";

export abstract class Render<T extends graphicsGraphic.ViewGraphic = graphicsGraphic.ViewGraphic> implements graphicsRenderes.IRender<T> {
  public abstract render(view: T): void;
}
