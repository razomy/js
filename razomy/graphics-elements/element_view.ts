import * as graphicsAttributes from "@razomy/graphics-attributes";
import * as resources from "@razomy/resources";
import * as graphicsGraphic from "@razomy/graphics-graphic";

export class ElementView extends graphicsGraphic.ViewGraphic {
  constructor() {
    super();
    this.resources[graphicsAttributes.SizeAttribute.type] = new graphicsAttributes.SizeAttribute(0, 0);
    this.resources[graphicsAttributes.PositionAttribute.type] = new graphicsAttributes.PositionAttribute(0, 0);
    this.resources[resources.ResourceCollection.type] = new resources.ResourceCollection<ElementView>([]);
  }

  public get width() {
    return this.getBy(graphicsAttributes.SizeAttribute).width;
  }

  public get height() {
    return this.getBy(graphicsAttributes.SizeAttribute).height;
  }

  public get children() {
    return this.getBy<resources.ResourceCollection<ElementView>>(resources.ResourceCollection).getAll();
  }
}
